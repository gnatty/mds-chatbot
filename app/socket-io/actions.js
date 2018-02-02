const debug = require('debug');
const log = debug('log::socket');
const messages = require('./../config/messages.json');

let actions = {
  'EMIT_BOT_RESPONSE': (socket, msg) => {
    socket.emit('user::newMessage::sender', {
      type: 'text',
      username: 'system',
      message: msg
    });
  },
  'EMIT_MESSAGE_ERROR': (socket, msg) => {
    socket.emit('user::newMessage::sender', {
      type: 'text',
      username: 'system',
      message: msg
    });
  },
  'EMIT_GLOBAL': (socket, obj) => {
    actions.EMIT_MESSAGE(socket, obj);
    actions.BROADCAST_MESSAGE(socket, obj);
  }, 
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
  'COMMAND': (type, socket, obj, chat) => {

    let testCmd = chat.isBotCommandExist(obj.message, type);
    log('====> command : ');
    log(testCmd);

    switch(true) {
    /**
      * Not found bot.
      */
    case Object.is(testCmd.exist, false):
      actions.EMIT_MESSAGE_ERROR(socket, messages.error_cmd);
    break;
    /**
      * Access not granded.
      */
    case Object.is(testCmd.exist, true) && Object.is(testCmd.access, false):
      actions.EMIT_MESSAGE_ERROR(socket, messages.error_cmd_access);
    break;
    /**
      * Search command.
      */
    default:

    break;
    }
  },
  'VISITOR_COMMAND': (socket, obj, chat) => {
    actions.COMMAND('visitor', socket, obj, chat);
  }
};

module.exports = actions;