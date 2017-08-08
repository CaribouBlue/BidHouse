const server = require('./server');
const io = require('socket.io')(server);
const e = require('./eventHandlers/eventHandlers');

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('disconnect', () => {});

  socket.on('bid submit', (bid) => {
    io.emit('bid submit', bid);
    e.bidSubmit(bid);
  });
});

exports.socketsio = io;
