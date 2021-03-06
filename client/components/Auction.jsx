import React from 'react';
import io from 'socket.io-client';
import AlertContainer from 'react-alert';
import _ from 'lodash';
// import axios from 'axios';
import formatBid from '../lib/formatBid';
import formatTime from '../lib/formatTime';
import { checkVerified, getUser } from '../lib/checkToken';

export default class Auction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
      owner: '',
      minBid: 0,
      user: getUser(),
      bid: '$',
      bids: [],
      highest: { amount: 'none', user: 'none' },
      end: 'n/a',
      timeLeft: '',
    };

    /*===============================
    =            sockets            =
    ===============================*/

    this.socket = io();

    this.socket.on('bid submit', (bidObj) => {
      if (bidObj.id !== this.state.id) return;
      const bids = this.state.bids.slice();
      const newBid = bidObj;
      bids.push(newBid);
      this.setState({ bids });
      this.setHighest(true);
    });

    /*=====  End of sockets  ======*/


    this.submitBid = this.submitBid.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setHighest = this.setHighest.bind(this);
  }

  componentWillMount() {
    this.checkAuth();
  }

  componentDidMount() {
    this.checkTimeLeft = setInterval(() => {
      this.setState({ timeLeft: formatTime.fromMS(this.state.end) });
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.checkTimeLeft);
  }

  setStateFromLocation() {
    const state = this.props.location.state;
    this.setState({
      name: state.name,
      owner: state.owner,
      minBid: state.minBid,
      id: state.id,
      bids: state.bids,
      end: state.end,
      timeLeft: formatTime.fromMS(state.end),
    }, () => {
      if (this.state.bids.length > 0) this.setHighest();
    });
  }

  setHighest(socketTrigger = false) {
    const highest = this.state.bids.reduce((max, bidObj) =>
      (max.amount >= bidObj.amount ? max : bidObj),
    );
    if (socketTrigger) this.alertNewHighest(highest);
    this.setState({ highest });
  }

  alertNewHighest(highest) {
    console.log('here');
    if (highest.amount !== this.state.highest.amount) {
      this.showAlert(
        `New highest bid of ${formatBid(highest.amount)}, posted by ${highest.user}`,
        { time: 2000, type: 'info' },
      );
    }
  }

  checkAuth() {
    const verified = checkVerified();
    if (!verified) this.props.history.push('/app/home/login');
    else {
      this.setStateFromLocation();
    }
  }

  handleChange({ target }) {
    const bid = formatBid(target.value);
    this.setState({ bid });
  }

  submitBid(e) {
    e.preventDefault();
    const bid = formatBid(this.state.bid, 'num');
    const min = this.state.minBid;
    if (this.state.timeLeft === 'CLOSED') {
      this.showAlert('This auction is closed', {
        time: 2000,
        type: 'error',
      });
      return;
    }
    if (bid < min) {
      this.showAlert(`Your bid is below the minimum (${formatBid(min)})`, {
        time: 2000,
        type: 'error',
      });
      return;
    }
    if (bid <= this.state.highest.amount) {
      this.showAlert(`Your bid must be higher than the current winning bid (${formatBid(this.state.highest.amount)})`, {
        time: 2000,
        type: 'error',
      });
      return;
    }
    this.socket.emit('bid submit', {
      amount: bid,
      id: this.state.id,
      user: this.state.user,
    });
    this.setState({ bid: '$' });
    this.showAlert('Bid Placed!', {
      time: 2000,
      type: 'success',
    });
  }

  showAlert(text, options) {
    this.msg.show(text, Object.assign({ position: 'top left' }, options));
  }


  render() {
    return (
      <div className="flex-col-center" >
        <AlertContainer ref={a => this.msg = a} />
        <h1 className="header">Auction: {this.state.name}</h1>
        <p className="auction-prop-header">Time left:</p>
        <h3 className="auction-prop" >
          {`${this.state.timeLeft}`}
        </h3>
        <p className="auction-prop-header">Current Highest Bid:</p>
        <h3 className="auction-prop" >
          <span
            className={this.state.user === this.state.owner ? 'gold-accent' :
              (this.state.highest.user === this.state.user ? 'green-accent' : 'red-accent')}
          >
            {` ${formatBid(this.state.highest.amount)} - ${this.state.highest.user}`}
          </span>
        </h3>
        <p className="auction-prop-header">Minimum Bid:</p>
        <h5 className="auction-prop" >
          {`${formatBid(this.state.minBid)}`}
        </h5>
        <form
          onSubmit={this.submitBid}
        >
          <input
            type="text"
            name="bid"
            onChange={this.handleChange}
            value={this.state.bid}
          />
          <button
            type="submit"
          >
            Submit
          </button>
        </form>
        <h4 className="sub-header" >Bid History</h4>
        {this.state.bids.sort((a, b) => b.amount - a.amount).map(bid => (
          <p
            key={_.uniqueId()}
          >
            {formatBid(bid.amount)}
            - {bid.user}
          </p>
        ))}
      </div>
    );
  }
}

