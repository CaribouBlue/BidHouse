const q = require('../queryHandlers/queryHandlers');

exports.bidSubmit = (bid) => {
  q.storeBid(bid);
};
