const server = require('./server');
const io = require('socket.io')(server);
const e = require('./eventHandlers/eventHandlers');

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('disconnect', () => {});

  socket.on('bid submit', (bidObj) => {
    io.emit('bid submit', bidObj);
    e.bidSubmit(bidObj);
  });
});

exports.socketsio = io;
