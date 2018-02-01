let bot = {

  'prefix': 'help',
  'name': 'Bot helper',

  'actions': {
    '_default': () => {
      return 'default bot message';
    },
    'register': () => {
      return 'default bot message register';
    }
  }
}

module.exports = bot;