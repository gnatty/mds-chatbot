const debug = require('debug');
const log = debug('log::socket');
const actions = require('./actions.js');

module.exports = (socket, chat) => {

  socket.on('user::message', (obj) => {

    let validator = chat.validator(obj);

    // --- ERROR BAD REQUEST.
    if( !validator.isValidObject ) {
      log("not a valid object");
      return false;
    }

    switch(true) {
      /**
        * Normal message without token.
        */
      case ( Object.is(validator.isCommand, false) && Object.is(validator.isEmptyToken, true) ):
        log("send message without be logged.");
        actions.EMIT_MESSAGE(socket, obj);
        return true;
      break;
      /**
        * Normal message.
        */
      case ( Object.is(validator.isCommand, false) && Object.is(validator.isEmptyToken, false) ):
        log("send message");
        actions.EMIT_MESSAGE(socket, obj);
        actions.BROADCAST_MESSAGE(socket, obj);
        return true;
      break;
      /**
        * Logged user command.
        */
      case ( Object.is(validator.isCommand, true) && Object.is(validator.isEmptyToken, false) ):
        log("send command");
        actions.EMIT_MESSAGE(socket, obj);
        return true;
      break;
      /**
        * Visitor user command.
        */
      case ( Object.is(validator.isCommand, true) && Object.is(validator.isEmptyToken, true) ):
        log("send command without be logged");
        actions.EMIT_MESSAGE(socket, obj);
        return true;
      break;
      /**
        * Not recognized action.
        */
      default:
        log("err action not found.");
        return false;
      break;
    }

  });

};