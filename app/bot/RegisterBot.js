let bot = {

  'prefix': 'register',
  'name': 'Bot Register',

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