const express = require('express');
const bodyParser = require('body-parser');
const passport = require('./auth/passportStrat');
const router = require('./routes');

const app = express();

// middlewear
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

// routing
app.use('/app', express.static('client'));
app.use('/app/static', express.static('client-bundle'));
app.use('/api', router);

app.get('/app/*', (req, res) => {
  res.redirect(`/app#${req.params['0']}`);
});

app.get('*', (req, res) => {
  res.redirect('/app');
});

module.exports = app;
