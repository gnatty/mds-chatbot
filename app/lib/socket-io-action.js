module.exports = (socket, logSocket) => {

  socket.emit('user::askCredentials', null);

  socket.on('user::checkCredentials', (token) => {
    logSocket('token');
  });
  socket.on('user:newCredentials', () => {
    logSocket('new token asked');
  });

  socket.on('user::msg', (msg) => {
    logSocket(msg);
  });

  socket.on('disconnect', () => {
    logSocket('user disconnected');
  });

};