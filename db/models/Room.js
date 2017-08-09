const mongoose = require('mongoose');

const RoomSchema = mongoose.mongoose.Schema({
  owner_id: mongoose.Schema.Types.ObjectId,
  bidder_ids: [mongoose.Schema.Types.ObjectId],
  name: String,
});

module.exports = mongoose.model('Room', RoomSchema);
