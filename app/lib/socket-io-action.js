module.exports = (socket, logSocket, dataUsers, chat) => {

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
  socket.on('user::message', (obj) => {
    // --- check if is valid data object.
    if( !chat.isValidObject(obj) ) {
      logSocket("Not a valid object");
      return false;
    }
    // --- check if message is empty.
    if( chat.isEmptyMessage(obj.message) ) {
      logSocket("Empty message");
      return false;
    }
    // --- check if it's a command.
    if( chat.isCommande(obj.message) ) {
      let cmd = chat.getCommande(obj.message);
      logSocket("Cmd found :");
      logSocket(cmd);
      return true;
    }
    // --- else it's just a normal text message.
    logSocket("Normal message received");
    logSocket(obj);
    socket.emit('user::newMessage::sender', {
      message: obj.message
    });
    socket.broadcast.emit('user::newMessage::all', {
      message: obj.message
    });
  });

  /**
    * ON DISCONNECT.
    *
    */
  socket.on('disconnect', () => {
    logSocket('user disconnected');
  });

};