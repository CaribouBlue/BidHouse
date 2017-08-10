const mongoose = require('mongoose');

const BidSchema = mongoose.Schema({
  amount: Number,
  user: String,
  time: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Bid', BidSchema);
