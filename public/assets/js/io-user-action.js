
socket.on('user::askCredentials', function(data) {
  var userToken = getUserToken();
  if(userToken !== null && userToken.length > 30) {
    socket.emit('user::checkCredentials', userToken);
  }
});

socket.on('user::newMessage::sender', function(data) {
  setMessageRight('root', data.message);
});
socket.on('user::newMessage::all', function(data) {
  setMessageLeft('root', data.message);
});

function sendMessage() {
  var msg = getUserMessage();
  socket.emit('user::message', 
    {
      token: getUserToken(),
      message: msg
    }
  );
}

function setMessageRight(username, msg) {

  var template = $($(selectorTemplate.right).html());
  template.find('.labelUserName').text('@'+username);
  template.find('.card-text').text(msg);

  console.log(template);
  $(selectorChatContent).prepend(template);
  console.log($(selectorChatContent));
}

function setMessageLeft(username, msg) {

  var template = $($(selectorTemplate.left).html());
  template.find('.labelUserName').text('@'+username);
  template.find('.card-text').text(msg);

  console.log(template);
  $(selectorChatContent).prepend(template);
  console.log($(selectorChatContent));
}
