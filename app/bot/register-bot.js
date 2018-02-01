let bot = {

  'prefix': 'register',
  'name': 'Bot Register',
  'access': ['visitor', 'logged'],

  'actions': {
    '_default': {
      'access': ['visitor', 'logged'],
      'action': () => {
        return 'default bot message';
      }
    },
    'register': {
      'access': ['visitor', 'logged'],
      'action': () => {
        return 'default bot message register';
      }
    },
  }
}

module.exports = bot;