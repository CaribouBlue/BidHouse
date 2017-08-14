import React from 'react';
import {
  Link,
} from 'react-router-dom';
import { checkVerified } from '../lib/checkToken';

export default (props) => {
  const displayLogout = () => {
    if (!checkVerified()) return '';
    return (
      <button
        className="menu-button"
        onClick={() => {
          localStorage.removeItem('auctionHouse');
          props.history.push('/app');
        }}
      >Logout</button>
    );
  };

  return (
    <div className="menu-bar" >
      <Link className="menu-button" to="/app" ><p>Home</p></Link>
      <Link className="menu-button" to="/app/about" ><p>About</p></Link>
      {displayLogout()}
    </div>
  );
};
