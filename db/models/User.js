const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { promisify } = require('bluebird');

const hashPromise = promisify(bcrypt.hash.bind(bcrypt));

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
});

UserSchema.pre('save', function hashPwd(next) {
  hashPromise(this.password, null, null)
    .then((hash) => {
      this.password = hash;
      next();
    });
});

module.exports = mongoose.model('User', UserSchema);
