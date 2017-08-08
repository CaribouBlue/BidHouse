const app = require('./config');
const db = require('../db/config');

const port = 3000;

const server = app.listen(port, console.log.bind(console, `Listening on port: ${port}`));
db.on('open', console.log.bind(console, 'Mongodb open'));

module.exports = server;
