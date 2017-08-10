import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class AuctionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auctions: [],
    };
  }

  componentWillMount() {
    this.getAuctions();
  }

  getAuctions() {
    axios.get('/api/auctions')
      .then(({ data }) => {
        this.setState({ auctions: data });
      });
  }

  render() {
    return (
      <div>
        {this.state.auctions.map((auction) => {
          return (
            <Link
              key={auction._id}
              to={{
                pathname: '/app/auction',
                state: {
                  name: auction.name,
                  minBid: auction.minBid,
                  owner: auction.owner,
                  id: auction._id,
                  bids: auction.bids,
                },
              }}
            >{auction.name}</Link>
          );
        })}
      </div>
    );
  }
}
