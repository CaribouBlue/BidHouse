const mongoose = require('mongoose');
const { username, password } = require('./mLab-auth.js');

const dbUri = `mongodb://${username}:${password}@ds123050.mlab.com:23050/gasdb`;

mongoose.connect(dbUri, {
  useMongoClient: true,
});

module.exports = mongoose.connection;
