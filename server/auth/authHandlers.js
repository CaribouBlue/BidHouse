const q = require('../queryHandlers/queryHandlers');
const jwt = require('jsonwebtoken');

exports.serialize = (req, res, next) => {
  const username = req.query.username;
  q.getUserId(username)
    .then((id) => {
      if (!id) res.send('error');
      req.user = { id };
      next();
    });
};

exports.generateToken = (req, res, next) => {
  req.token = jwt.sign(
    {
      id: req.user.id,
      verified: true,
    },
    'alakazam',
    { expiresIn: '10h' },
  );
  next();
};

exports.respond = (req, res) => {
  res.send({
    user: req.query.username,
    token: req.token,
  });
};
