class Bot {

  constructor(bots) {
    this.bots = typeof bots == 'undefined' ? [] : bots;
  }

  add(bot) {
    this.bots.push(bot);
  }

  find(prefix) {
    return this.bots.find( (bot) => {
      return bot.prefix == prefix;
    });
  }

  exist(prefix) {
    let res = this.find(prefix);
    if(typeof res == 'undefined') {
      return false;
    }
    return true;
  }

  existWithAccess(prefix, access) {
    let res = this.find(prefix);
    let search = res.access.find( (role) => {
      return role == access;
    });
    if(typeof search == 'undefined') {
      return false;
    }
    return true;
  }

  actionExist(prefix, action) {
    let res = this.findByAction(prefix, action);
    console.log(res);
    if( Object.is(res, false) ) {
      return false;
    }
    return true;
  }

  findByAction(prefix, action) {
    let res = this.find(prefix);
    if(typeof res == 'undefined') {
      return false;
    }
    for(let act in res.actions) {
      if(act == action) {
        return res.actions[act];
      }
    }
    return false;
  }

  findByActionWithAccess(prefix, action, access) {
    let res = this.findByAction(prefix, action);
    let search = res.access.find( (role) => {
      return role == access;
    });
    if(typeof search == 'undefined') {
      return false;
    }
    return true;
  }

}

module.exports = Bot;