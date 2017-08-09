const express = require('express');
const r = require('./requestHandlers/requestHandlers');
const passport = require('./auth/passportStrat');
const {
  serialize,
  generateToken,
  respond,
} = require('./auth/authHandlers');

const router = express.Router();

router.get('/bids', r.getAllBids);

router.post('/signup', r.signUp);

router.get('/login', passport.authenticate(
  'local', {
    session: false,
  }), serialize, generateToken, respond);

module.exports = router;
