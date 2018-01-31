module.exports = (socket, logSocket, dataUsers) => {

  /**
    * USER CREDENTIALS.
    *
    */
  socket.emit('user::askCredentials', null);

  socket.on('user::checkCredentials', (token) => {
    logSocket('token');
  });
  socket.on('user:newCredentials', () => {
    // let newToken = dataUsers.createToken('root');
    logSocket('new token asked');
  });

  /**
    * USER MESSAGE.
    *
    */
  socket.on('user::message', (msg) => {
    logSocket(msg);
  });

  /**
    * ON DISCONNECT.
    *
    */
  socket.on('disconnect', () => {
    logSocket('user disconnected');
  });

};