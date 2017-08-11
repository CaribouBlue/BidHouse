const mongoose = require('mongoose');

const AuctionSchema = mongoose.Schema({
  owner: String,
  bidders: { type: [String], default: [] },
  name: String,
  minBid: Number,
  bids: [],
  end: { type: Number, default: Date.now() + 3600000 },
  start: { type: Number, default: Date.now() },
});

module.exports = mongoose.model('Auction', AuctionSchema);
