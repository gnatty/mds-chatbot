class Bot {

  constructor(bots) {
    this.bots = typeof bots == 'undefined' ? [] : bots;
    this.regex = /^\/([a-zA-Z0-9]+)((\s([a-zA-Z0-9]+))(\s(.*))?)?/g;
    this.defaultAction = '_default';
  }

  add(bot) {
    this.bots.push(bot);
  }

  find(prefix) {
    return this.bots.find( (bot) => {
      return bot.prefix == prefix;
    });
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

  exist(cmd, access) {
    let isDefaultAction = false;
    let res = {
      'bot_exist': false,
      'bot_access': false,
      'action_exist': null,
      'action_access': null,
      'cmd': cmd
    };
    let search = this.find(cmd.prefix);
    if(typeof search == 'undefined') {
      return res;
    }
    res.bot_exist = true;
    // --- bot access.
    if(search.access.length === 0) {
      res.bot_access = true;
    }
    search.access.find( (acc) => {
      if(acc == access) {
        res.bot_access = true;
      }
    });
    // --- bot action.
    if( typeof cmd.action == 'undefined' ) {
      cmd.action = this.defaultAction;
    } 
    for(let action in search.actions) {
      if(action == cmd.action) {
        let findAction = search.actions[action];
        findAction.access.find( (acc) => {
          if( acc == access ) {
            res.action_access = true;
          }
        });
        res.action_exist = true;
      }
    }
    if( Object.is(res.action_exist, null) ) {
      res.action_exist = false;
    } else if( Object.is(res.action_access, null) ) {
      res.action_access = false;
    }
    return res;
  }

}

module.exports = Bot;