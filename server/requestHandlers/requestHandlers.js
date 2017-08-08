const q = require('../queryHandlers/queryHandlers');

exports.getAllBids = (req, res) => {
  q.findAllBids({})
    .then((bids) => {
      res.send(bids);
    });
};
