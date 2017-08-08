const { promisify } = require('bluebird');
const Bid = require('../../db/models/Bid');

const findAllBidsPromise = promisify(Bid.find.bind(Bid));
exports.findAllBids = params => findAllBidsPromise(params);

exports.storeBid = ({ amount }) => {
  const newBid = new Bid({
    amount
  });
  newBid.save();
};

