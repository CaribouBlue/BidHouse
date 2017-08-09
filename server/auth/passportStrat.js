const passport = require('passport');
const Strategy = require('passport-local');
const q = require('../queryHandlers/queryHandlers');
const { promisify } = require('bluebird');
const bcrypt = require('bcrypt-nodejs');

const comparePromise = promisify(bcrypt.compare.bind(bcrypt));

passport.use(new Strategy(
  (username, password, done) => {
    q.findUsers({ username })
      .then((users) => {
        if (users.length < 1) {
          done(null, false);
          return;
        }
        comparePromise(password, users[0].password)
          .then(match => (
            match ?
              done(null, {
                id: users[0].password,
                username: users[0].username,
                verified: true,
              }) :
              done(null, false)
          ));
      });
  },
));

module.exports = passport;
