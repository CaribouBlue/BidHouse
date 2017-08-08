const {
  Schema,
  model,
} = require('mongoose');

const RoomSchema = Schema({
  owner_id: Schema.Types.ObjectId,
  bidder_ids: [Schema.Types.ObjectId],
  name: String,
});

module.exports = model('Room', RoomSchema);
