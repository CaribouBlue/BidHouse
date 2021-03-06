import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import io from 'socket.io-client';
import { getUser } from '../lib/checkToken';
import { fromMS } from '../lib/formatTime';

export default class AuctionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auctions: [],
      myAuctions: [],
    };

    /*===============================
    =            sockets            =
    ===============================*/

    this.socket = io();

    this.socket.on('auction list change', () => {
      this.getAuctions();
    });

    /*=====  End of sockets  ======*/
  }

  componentWillMount() {
    this.getAuctions();
  }

  getAuctions() {
    axios.get('/api/auctions')
      .then(({ data }) => {
        const user = getUser();
        const auctions = [];
        const myAuctions = [];
        data.forEach((auction) => {
          auction.owner === user ?
            myAuctions.push(auction) :
            auctions.push(auction);
        });
        this.setState({ auctions, myAuctions });
      });
  }

  deleteAuction(id) {
    axios.post('/api/auction/delete', { id })
      .then((res) => {
        this.socket.emit('auction list change');
      });
  }

  render() {
    return (
      <div className="auction-lists">
        <div className="flex-col-center" >
          <h4 className="sub-header">Auctions:</h4>
          <ul className="auction-list">
            {this.state.auctions.sort((a, b) => b.end - a.end).map(auction => (
              <li
                className="auction-li"
                key={_.uniqueId()}
              >
                <Link
                  className={fromMS(auction.end) === 'CLOSED' ? 'link-closed' : 'link'}
                  to={{
                    pathname: '/app/auction',
                    state: {
                      name: auction.name,
                      minBid: auction.minBid,
                      owner: auction.owner,
                      id: auction._id,
                      bids: auction.bids,
                      end: auction.end,
                    },
                  }}
                >{auction.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-col-center">
          <h4 className="sub-header">My Auctions:</h4>
          <ul className="auction-list">
            {this.state.myAuctions.map(auction => (
              <li
                className="auction-li"
                key={_.uniqueId()}
              >
                <Link
                  className={fromMS(auction.end) === 'CLOSED' ? 'link-closed' : 'link'}
                  to={{
                    pathname: '/app/auction',
                    state: {
                      name: auction.name,
                      minBid: auction.minBid,
                      owner: auction.owner,
                      id: auction._id,
                      bids: auction.bids,
                      end: auction.end,
                    },
                  }}
                >{auction.name}</Link>
                <button className="warning-button"
                  onClick={this.deleteAuction.bind(this, auction._id)}
                >Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
