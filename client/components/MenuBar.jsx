import React from 'react';
import {
  Link,
} from 'react-router-dom';
import { checkVerified } from '../lib/checkToken';

export default props => {
  const displayLogout = () => {
    if (!checkVerified()) return '';
    else return (
      <button
        onClick={() => {
          localStorage.removeItem('auctionHouse');
          props.history.push('/app');
        }}
      >Logout</button>
    )
  }
  return(
    <div>
      <Link to="/app" >Home</Link>
      <Link to="/app/about" >About</Link>
      {displayLogout()}
    </div>
  );
};
