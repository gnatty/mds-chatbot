let actions = {
  'GET_USER_TOKEN': function () {
    let token = localStorage.getItem('user::token');
    if(token == null) {
      return '';
    }
    return token;
  },
  'RESET_INPUT_VALUE': function() {
    document.querySelector('.inputSendMessage').value = '';
  },
  'SET_USER_TOKEN': function(token) {
    localStorage.setItem('user::token', token);
  },
  'REMOVE_USER_TOKEN': function() {
    localStorage.removeItem('user::token');
  },
  'GET_INPUT_VALUE': function() {
    return document.querySelector('.inputSendMessage').value;
  },
  'SEND_MESSAGE': function(socket) {
    socket.emit('user::message', 
      {
        token: actions.GET_USER_TOKEN(),
        message: actions.GET_INPUT_VALUE()
      });
    actions.RESET_INPUT_VALUE();
  },
  'GET_TEMPLATE_MESSAGE': function(dir) {
    dir = dir == 'left' ? '#template-message-left' : '#template-message-right';
    let tpl = document.querySelector(dir).content.firstElementChild.cloneNode(true);
    return tpl;
  },
  'SET_MESSAGE': function(dir, data) {
    let tpl = actions.GET_TEMPLATE_MESSAGE(dir);
    tpl.querySelector('.labelUserName').innerHTML = '@' + data.username;
    tpl.querySelector('.card-text').innerHTML = data.message;
    document.querySelector('.chat-content').prepend(tpl);
  }
};

module.exports = actions;