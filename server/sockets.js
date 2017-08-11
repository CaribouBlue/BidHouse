const server = require('./server');
const io = require('socket.io')(server);
const e = require('./eventHandlers/eventHandlers');

io.on('connection', (socket) => {
  socket.on('disconnect', () => {});

  socket.on('bid submit', (bidObj) => {
    io.emit('bid submit', bidObj);
    e.bidSubmit(bidObj);
  });

  socket.on('auction list change', () => {
    io.emit('auction list change');
  });
});

exports.socketsio = io;
