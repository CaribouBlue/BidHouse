const mongoose = require('mongoose');

const BidSchema = mongoose.Schema({
  amount: Number,
  user: String,
  time: { type: Date, default: Date.now() },
  room_id: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Bid', BidSchema);
