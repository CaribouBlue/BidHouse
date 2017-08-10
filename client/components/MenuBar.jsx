import React from 'react';
import {
  Link,
} from 'react-router-dom';

export default props => (
  <div>
    <Link to="/app" >Home</Link>
    <Link to="/app/about" >About</Link>
    <Link to="/app/auction" >Auction</Link>
    <button
      onClick={() => {
        localStorage.removeItem('auctionHouse');
        props.history.push('/app');
      }}
    >Logout</button>
  </div>
);
