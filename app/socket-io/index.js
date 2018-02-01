const io = require('socket.io');
const on = require('./on.js');

module.exports = {
  'run' : (server, chat) => {
    io(server).on('connection', (socket) => {
      on(socket, chat);
    });
  }
}