let actions = {
  'EMIT_MESSAGE': (socket, obj) => {
      socket.emit('user::newMessage::sender', {
        type: 'text',
        username: 'root',
        message: obj.message
      });
  },
  'BROADCAST_MESSAGE': (socket, obj) => {
      socket.broadcast.emit('user::newMessage::all', {
        type: 'text',
        username: 'root',
        message: obj.message
      });
  },
};

module.exports = actions;