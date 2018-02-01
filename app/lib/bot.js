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

  findByAction(prefix, action) {
    let res = this.find(prefix);
    if(typeof res == 'undefined') {
      return null;
    }
    for(let act in res.actions) {
      if(act == action) {
        return res.actions[act];
      }
    }
    return null;
  }

}

module.exports = Bot;