let actions = {
  'GET_USER_TOKEN': () => {
    let token = localStorage.getItem('user::token');

    if (token === null) {
      return '';
    }
    return token;
  },
  'RESET_INPUT_VALUE': () => {
    document.querySelector('.inputSendMessage').value = '';
  },
  'SET_USER_TOKEN': (token) => {
    localStorage.setItem('user::token', token);
  },
  'REMOVE_USER_TOKEN': () => {
    localStorage.removeItem('user::token');
  },
  'GET_INPUT_VALUE': () => {
    return document.querySelector('.inputSendMessage').value;
  },
  'SEND_MESSAGE': (socket) => {
    socket.emit('user::message',
      {
        'token': actions.GET_USER_TOKEN(),
        'message': actions.GET_INPUT_VALUE()
      });
    actions.RESET_INPUT_VALUE();
  },
  'GET_TEMPLATE_MESSAGE': (dir) => {
    dir = dir === 'left' ? '#template-message-left' : '#template-message-right';
    let tpl = document.querySelector(dir).content.firstElementChild.cloneNode(true);

    return tpl;
  },
  'SET_MESSAGE': (dir, data) => {
    let tpl = actions.GET_TEMPLATE_MESSAGE(dir);

    tpl.querySelector('.labelUserName').innerHTML = '@' + data.username;
    tpl.querySelector('.card-text').innerHTML = data.message;
    document.querySelector('.chat-content').prepend(tpl);
  }
};

module.exports = actions;
