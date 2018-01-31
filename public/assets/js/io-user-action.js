
socket.on('user::askCredentials', function(data) {
  var userToken = getUserToken();
  if(userToken !== null && userToken.length > 30) {
    socket.emit('user::checkCredentials', userToken);
  }
});

function sendMessage(msg) {
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

