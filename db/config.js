const mongoose = require('mongoose');
const { username, password } = require('./mLab-auth.js');

const dbUri = `mongodb://${username}:${password}@ds149258.mlab.com:49258/auction`;

mongoose.connect(dbUri, {
  useMongoClient: true,
});

module.exports = mongoose.connection;
