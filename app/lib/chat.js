class Chat {

  constructor(bot) {
    this.bot    = bot;
    this.regex = /^\/([a-zA-Z0-9]+)((\s([a-zA-Z0-9]+))(\s(.*))?)?$/g;
  }

  getBot() {
    return this.bot;
  }

  isCommand(message) {
    let res = this.getCommand(message);
    return !Object.is(res, null);
  }

  isEmptyMessage(message) {
    if(typeof message == 'undefined' || message == '') {
      return true;
    }
    return false;
  }

  isValidObject(obj) {
    if(typeof obj != 'object' 
      || typeof obj.message != 'string' || typeof obj.token != 'string') {
      return false;
    }
    return true;
  }

  isEmptyToken(token) {
    if(typeof token == 'undefined' || token == '') {
      return true;
    }
    return false;
  }

  isBotCommandExist(message, type) {
    let cmd = this.getCommand(message);
    return this.bot.exist(cmd, type);
  }

  getCommand(message) {
    this.regex.lastIndex = 0; // reset last index property.
    let res = this.regex.exec(message);
    if( Object.is(res, null) ) {
      return null;
    }
    return {
      'prefix': res[1],
      'action': res[4],
      'val': res[6]
    };
  }

  validator(obj) {
    return {
      "isValidObject" : this.isValidObject(obj),
      "isEmptyMessage" : this.isEmptyMessage(obj.message),
      "isCommand" : this.isCommand(obj.message),
      "isEmptyToken" : this.isEmptyToken(obj.token)
    };
  }

}

module.exports = (bot) => {
  return new Chat(bot);
}