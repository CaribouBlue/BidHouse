import React from 'react';
import io from 'socket.io-client';
import AlertContainer from 'react-alert';
// import axios from 'axios';
import formatBid from '../lib/formatBid';
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
      highest: { amount: 'None' },
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
      this.setHighest();
    });

    /*=====  End of sockets  ======*/


    this.submitBid = this.submitBid.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setHighest = this.setHighest.bind(this);
  }

  componentWillMount() {
    this.checkAuth();
  }

  setStateFromLocation() {
    const state = this.props.location.state;
    this.setState({
      name: state.name,
      owner: state.owner,
      minBid: state.minBid,
      id: state.id,
      bids: state.bids,
    }, () => {
      if (this.state.bids.length > 0) this.setHighest();
    });
  }

  setHighest() {
    const highest = this.state.bids.reduce((max, bidObj) =>
      (max.amount >= bidObj.amount ? max : bidObj),
    );
    this.setState({ highest });
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
    if (bid < min) {
      this.showAlert(`Your bid is below the minimum (${formatBid(min)})`, {
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
    this.msg.show(text, options);
  }


  render() {
    return (
      <div>
        <AlertContainer ref={a => this.msg = a} />
        <h1>Auction: {this.state.name}</h1>
        <h3>Current Highest Bid:
          {`${formatBid(this.state.highest.amount)} - ${this.state.highest.user}`}
        </h3>
        <h5>{`Minimum Bid: ${formatBid(this.state.minBid)}`}</h5>
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
        <h4>Bid History</h4>
        {this.state.bids.map((bid, i) => (
          <p
            key={i}
          >
            {formatBid(bid.amount)}
            - {bid.user}
          </p>
        ))}
      </div>
    );
  }
}

