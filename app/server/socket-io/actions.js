const debug = require('debug');
const logCmd = debug('log::socket::cmd');
const messages = require('./../config/messages.json');

const actions = {
  'EMIT_BOT_RESPONSE': (socket, msg) => {
    socket.emit('user::newMessage::sender', {
      'type': 'text',
      'username': 'system',
      'message': msg
    });
  },
  'EMIT_MESSAGE_ERROR': (socket, msg) => {
    socket.emit('user::newMessage::sender', {
      'type': 'text',
      'username': 'system',
      'message': msg
    });
  },
  'EMIT_GLOBAL': (socket, obj) => {
    actions.EMIT_MESSAGE(socket, obj);
    actions.BROADCAST_MESSAGE(socket, obj);
  },
  'EMIT_MESSAGE': (socket, obj) => {
    socket.emit('user::newMessage::sender', {
      'type': 'text',
      'username': 'root',
      'message': obj.message
    });
  },
  'BROADCAST_MESSAGE': (socket, obj) => {
    socket.broadcast.emit('user::newMessage::all', {
      'type': 'text',
      'username': 'root',
      'message': obj.message
    });
  },
  'COMMAND': (type, socket, obj, chat) => {
    let testCmd = chat.isBotCommandExist(obj.message, type);

    logCmd(testCmd);

    switch (true) {
      /**
        * Command not found.
        */
      case Object.is(testCmd.bot_exist, false):
        actions.EMIT_MESSAGE_ERROR(socket, messages.error_cmd);
        break;
      /**
        * Command access required.
        */
      case Object.is(testCmd.bot_exist, true) && Object.is(testCmd.bot_access, false):
        actions.EMIT_MESSAGE_ERROR(socket, messages.error_cmd_access);
        break;
      /**
        * Action not found.
        */
      case Object.is(testCmd.action_exist, false):
        actions.EMIT_MESSAGE_ERROR(socket, messages.error_cmd_action);
        break;
      /**
        * Action access required.
        */
      case Object.is(testCmd.action_exist, true) && Object.is(testCmd.action_access, false):
        actions.EMIT_MESSAGE_ERROR(socket, messages.error_cmd_action_access);
        break;
      /**
        * Execute action.
        */
      default:
        actions.EMIT_MESSAGE_ERROR(socket, 'cmd action execute');
        break;
    }
  },
  'VISITOR_COMMAND': (socket, obj, chat) => {
    actions.COMMAND('visitor', socket, obj, chat);
  }
};

module.exports = actions;
