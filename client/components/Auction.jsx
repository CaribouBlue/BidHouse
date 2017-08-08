import React from 'react';
import io from 'socket.io-client';
import AlertContainer from 'react-alert';

export default class Auction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bid: '$',
      bids: ['$10'],
    };

    this.socket = io();

    this.socket.on('bid submit', (bid) => {
      const bids = this.state.bids.slice();
      bids.push(this.formatBid(bid));
      this.setState({ bids });
    });

    this.alertOptions = {
      offset: 14,
      position: 'top left',
      theme: 'dark',
      time: 5000,
      transition: 'scale',
    };

    this.submitBid = this.submitBid.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  showAlert(text) {
    this.msg.show(text, {
      time: 2000,
      type: 'success',
    });
  }

  submitBid(e) {
    e.preventDefault();
    this.socket.emit('bid submit', this.state.bid.replace(/[^0-9]/g, ''));
    this.setState({ bid: '$' });
    this.showAlert('Bid Placed!');
  }

  handleChange({ target }) {
    const bid = this.formatBid(target.value);
    this.setState({ bid });
  }

  formatBid(bid) {
    let counter = 0;
    return `$${
      bid
        .replace(/[^0-9]/g, '')
        .split('')
        .reduceRight((str, num) => {
          const val = counter % 3 === 0 && counter !== 0 ?
            `${num},${str}`
            : `${num}${str}`;
          counter += 1;
          return val;
        }, '')
    }`;
  }

  render() {
    return (
      <div>
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <h1>Auction: {this.props.name}</h1>
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
        <pre>{this.state.bids}</pre>
        {this.state.bids.map(bid => (
          <p
            key={bid}
          >
            {bid}
          </p>
        ))}
      </div>
    );
  }
}
