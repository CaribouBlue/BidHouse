import jwtDecode from 'jwt-decode';

exports.checkVerified = () => {
  const authObj = JSON.parse(localStorage.getItem('auctionHouse'));
  if (!authObj) return false;
  const verified = jwtDecode(authObj.token).verified;
  if (verified) return true;
  return false;
};

exports.getUser = () => {
  const authObj = JSON.parse(localStorage.getItem('auctionHouse'));
  return authObj.user;
};
