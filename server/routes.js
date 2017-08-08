const express = require('express');
const r = require('./requestHandlers/requestHandlers');

const router = express.Router();

router.get('/bids', r.getAllBids);

module.exports = router;
