class Chat {

  constructor(commandesList = 'undefined') {
    this.regex = new RegExp("^\/([a-zA-Z0-9]+)((\\s(.*))?)$", "g");
    this.commandesList = [];
    if(typeof commandesList != 'undefined') {
      this.commandesList = commandesList;
    }
  }

  isCommande(message) {
    let res = message.split(this.regex);
    if(res.length < 3 || !this.commandesList.includes(res[1]) ) {
      return false;
    }
    return true;
  }

  getCommande(message) {
    let cmdRes = message.split(this.regex);
    return {
      "cmd"   : cmdRes[1],
      "value" :  cmdRes[2]
    };
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

}

module.exports = Chat;