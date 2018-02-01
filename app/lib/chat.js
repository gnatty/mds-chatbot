class Chat {

  constructor(bot) {
    this.bot    = bot;
    this.regex  = new RegExp("^\/([a-zA-Z0-9]+)((\\s(.*))?)$", "g");
  }

  getBot() {
    return this.bot;
  }

  isCommand(message) {
    let res = message.split(this.regex);
    return res.length >= 3;
  }

  isEmptyMessage(message) {
    if(typeof message == 'undefined' || message == "") {
      return true;
    }
    return false;
  }

  isValidObject(obj) {
    if(typeof obj != "object" 
      || typeof obj.message != "string" || typeof obj.token != "string") {
      return false;
    }
    return true;
  }

  isEmptyToken(token) {
    if(typeof token == 'undefined' || token == "") {
      return true;
    }
    return false;
  }

  isBotCommandExist(message) {
    let msg = this.getCommand(message);
    return this.bot.exist(msg.prefix);
  }

  isBotCommandExistWithAccess(message, access) {
    let msg = this.getCommand(message);
    return this.bot.existWithAccess(msg.prefix, access);
  }

  getCommand(message) {
    let cmdRes = message.split(this.regex);
    return {
      'prefix': cmdRes[1],
      'value': cmdRes[2].trim()
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