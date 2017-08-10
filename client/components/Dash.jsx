import React from 'react';
import axios from 'axios';
import AuctionList from './AuctionList';
import { getUser } from '../lib/checkToken';
import formatBid from '../lib/formatBid';

export default class Dash extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      creatingAuction: false,
      newAuction: {
        user: getUser(),
        name: '',
        minBid: 0,
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.getNewAuctionForm = this.getNewAuctionForm.bind(this);
    this.createAuction = this.createAuction.bind(this);
  }

  getNewAuctionForm() {
    return (
      <div>
        <form
          onSubmit={this.createAuction}
        >
          Name:
          <input
            type="text"
            name="name"
            placeholder="Auction Name"
            onChange={this.handleChange}
            value={this.state.newAuction.name}
          />
          Minimum Bid:
          <input
            type="text"
            name="minBid"
            placeholder="Minimum Bid"
            onChange={this.handleChange}
            value={formatBid(this.state.newAuction.minBid)}
          />
          <button type="submit" >Submit</button>
        </form>
        <button
          onClick={() => this.setState({ creatingAuction: false })}
        >Cancel</button>
      </div>
    );
  }

  handleChange({ target }) {
    const name = target.name;
    let val = target.value;
    if (name === 'minBid') {
      val = formatBid(val, 'num');
    }
    const newAuction = this.state.newAuction;
    newAuction[name] = val;
    this.setState({ newAuction });
  }

  createAuction(e) {
    e.preventDefault();
    axios.post('/api/auctions', this.state.newAuction)
      .then((res) => {
        console.log(res);
      });
  }

  renderNewAuctionForm() {
    if (this.state.creatingAuction) {
      return this.getNewAuctionForm();
    }
    return (
      <button
        onClick={() => this.setState({ creatingAuction: true })}
      >Create New Auction</button>
    );
  }

  render() {
    return (
      <div>
        {this.renderNewAuctionForm()}
        <AuctionList />
      </div>
    );
  }
}
