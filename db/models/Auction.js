const mongoose = require('mongoose');

const AuctionSchema = mongoose.Schema({
  owner: String,
  bidders: { type: [String], default: [] },
  name: String,
  minBid: Number,
  bids: [],
});

module.exports = mongoose.model('Auction', AuctionSchema);
