const express = require('express');

const app = express();

app.use(express.static('client'));
app.use(express.static('client-bundle'));

module.exports = app;