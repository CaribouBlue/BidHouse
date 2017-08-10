const { promisify } = require('bluebird');
const Bid = require('../../db/models/Bid');
const User = require('../../db/models/User');
const Auction = require('../../db/models/Auction');

const findAllBidsPromise = promisify(Bid.find.bind(Bid));
exports.findAllBids = query => findAllBidsPromise(query);

const findUsers = promisify(User.find.bind(User));
exports.findUsers = query => findUsers(query);

const findAuctions = promisify(Auction.find.bind(Auction));
exports.findAuctions = query => findAuctions(query);

exports.storeBid = (bidObj) => {
  exports.findAuctions({ _id: bidObj.id })
    .then((auctions) => {
      const auction = auctions[0];
      auction.bids.push({
        amount: bidObj.amount,
        user: bidObj.user,
        time: bidObj.time || Date.now(),
      });
      auction.save();
    });
};

exports.createUser = (username, password) => {
  const newUser = new User({
    username,
    password,
  });
  newUser.save();
};

exports.getUserId = username =>
  findUsers({ username })
    .then(users => (
      users.length > 0 ?
        users[0]._id :
        false
    ));

exports.createAuction = (query) => {
  const newAuction = new Auction(query);
  newAuction.save((err) => {
    console.log('save error:', err);
  });
};
