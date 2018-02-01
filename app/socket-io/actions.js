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

    log('access bot : ' + chat.isBotCommandExistWithAccess(obj.message, type));
    log('type : ' + type);
    if( !chat.isBotCommandExist(obj.message) ) {
      actions.EMIT_MESSAGE_ERROR(socket, messages.error_cmd);
      return false;
    } else if( !chat.isBotCommandExistWithAccess(obj.message, type) ) {
      actions.EMIT_MESSAGE_ERROR(socket, messages.error_cmd_access);
      return false;
    } else {
      let cmd = chat.getCommand(obj.message);
      if( !chat.bot.actionExist(cmd.prefix, cmd.value) ) {
        actions.EMIT_MESSAGE_ERROR(socket, messages.error_cmd);
        return false;
      } else {
        let res = chat.bot.findByAction(cmd.prefix, cmd.value);
        actions.EMIT_BOT_RESPONSE(socket, res.action.call());
        return true;
      }
    }
  },
  'VISITOR_COMMAND': (socket, obj, chat) => {
    actions.COMMAND('visitor', socket, obj, chat);
  }
};

module.exports = actions;