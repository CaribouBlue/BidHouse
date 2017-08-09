const { promisify } = require('bluebird');
const Bid = require('../../db/models/Bid');
const User = require('../../db/models/User');

const findAllBidsPromise = promisify(Bid.find.bind(Bid));
exports.findAllBids = params => findAllBidsPromise(params);

const findUsers = promisify(User.find.bind(User));
exports.findUsers = params => findUsers(params);

exports.storeBid = ({ amount }) => {
  const newBid = new Bid({
    amount,
  });
  newBid.save();
};

exports.createUser = (username, password) => {
  console.log('creating new user');
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
