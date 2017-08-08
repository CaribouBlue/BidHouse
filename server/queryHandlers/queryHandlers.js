const { promisify } = require('bluebird');
const Bid = require('../../db/models/Bid');

exports.storeBid = (bid) => {
  const newBid = new Bid({
    amount: bid,
  });
  newBid.save();
};
