const q = require('../queryHandlers/queryHandlers');

exports.bidSubmit = (bidObj) => {
  q.storeBid(bidObj);
};
