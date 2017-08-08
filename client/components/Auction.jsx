import React from 'react';
import io from 'socket.io-client';
import AlertContainer from 'react-alert';
import axios from 'axios';
import formatBid from '../lib/formatBid';

export default class Auction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bid: '$',
      bids: [],
      highest: { amount: 'None' },
    };

    /*===============================
    =            sockets            =
    ===============================*/

    this.socket = io();

    this.socket.on('bid submit', (bidObj) => {
      const bids = this.state.bids.slice();
      bidObj.amount = formatBid(bidObj.amount);
      bids.push(bidObj);
      this.setState({ bids });
      this.setHighest();
    });

    /*=====  End of sockets  ======*/


    this.submitBid = this.submitBid.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  componentWillMount() {
    this.getBids();
  }

  getBids() {
    axios.get('/api/bids')
      .then(({ data }) => {
        const bids = data.map(bidModel => ({
          amount: formatBid(`${bidModel.amount}`),
          id: bidModel._id,
        }));
        this.setState({ bids });
        this.setHighest();
      });
  }

  setHighest() {
    const highest = this.state.bids.reduce((max, bidObj) => {
      return formatBid(max.amount, 'num') >= formatBid(bidObj.amount, 'num') ? max : bidObj;
    });
    this.setState({ highest });
  }


  handleChange({ target }) {
    const bid = formatBid(target.value);
    this.setState({ bid });
  }

  submitBid(e) {
    e.preventDefault();
    this.socket.emit('bid submit', {
      amount: formatBid(this.state.bid, 'num'),
    });
    this.setState({ bid: '$' });
    this.showAlert('Bid Placed!');
  }

  showAlert(text) {
    this.msg.show(text, {
      time: 2000,
      type: 'success',
    });
  }


  render() {
    return (
      <div>
        <AlertContainer ref={a => this.msg = a} />
        <h1>Auction: {this.props.room}</h1>
        <h3>Current Highest Bid: {this.state.highest.amount}</h3>
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
            key={bid.id || i}
          >
            {bid.amount || bid}
          </p>
        ))}
        <pre>{console.log(this.state)}</pre>
      </div>
    );
  }
}

