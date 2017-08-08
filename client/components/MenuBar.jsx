import React from 'react';
import {
  Link,
} from 'react-router-dom';

export default () => (
  <div>
    <Link to="/app" >Home</Link>
    <Link to="/app/about" >About</Link>
    <Link to="/app/auction" >Auction</Link>
  </div>
);
