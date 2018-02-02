const bot = {

  'prefix': 'help',
  'name': 'Bot helper',
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
    'mydata': {
      'access': ['logged'],
      'action': () => {
        return 'default bot message my data';
      }
    },
  }
};

module.exports = bot;