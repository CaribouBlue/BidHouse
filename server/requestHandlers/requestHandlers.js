const q = require('../queryHandlers/queryHandlers');
const { promisify } = require('bluebird');
const bcrypt = require('bcrypt-nodejs');

const comparePromise = promisify(bcrypt.compare.bind(bcrypt));

exports.getAllBids = (req, res) => {
  q.findAllBids({})
    .then((bids) => {
      res.send(bids);
    });
};

exports.signUp = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  q.findUsers({ username })
    .then((users) => {
      if (users.length > 0) {
        res.send('Username already taken :\'(');
        return;
      }
      q.createUser(username, password);
      res.send('signed up');
    });
};

exports.login = (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  q.findUsers({ username })
    .then((users) => {
      if (users.length < 1) {
        res.send('Incorrect Username');
        return;
      }
      comparePromise(password, users[0].password)
        .then(match => (
          match ?
            res.send('logged in') :
            res.send('wrong password')
        ));
    });
};

exports.getAuctions = (req, res) => {
  q.findAuctions({})
    .then(auctions => res.send(auctions));
};

function getEnd(start, length) {
  const lengthArr = length.split(':');
  let hours = Number(lengthArr[0]);
  hours += Number(lengthArr[1]) / 60;
  hours *= 3600000;
  return start + hours;
}

exports.createAuction = (req, res) => {
  const name = req.body.name || 'MyAuction';
  const minBid = req.body.minBid;
  const owner = req.body.user;
  const start = Date.now();
  const end = getEnd(start, req.body.length);
  q.createAuction({ name, minBid, owner, start, end });
  res.send('auction created');
};

exports.deleteAuction = (req, res) => {
  q.removeAuction({ _id: req.body.id })
    .then(() => res.send('deleted'));
};

