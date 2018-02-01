
socket.on('user::askCredentials', function(data) {
  var userToken = getUserToken();
  if(userToken !== null && userToken.length > 30) {
    socket.emit('user::checkCredentials', userToken);
  }
});

socket.on('user::newMessage::sender', function(data) {
  setMessage('right', data);
});
socket.on('user::newMessage::all', function(data) {
  setMessage('left', data);
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

function setMessage(dir, data) {
  var sel       = dir=="left"?selectorTemplate.left : selectorTemplate.right;
  var template  = $($(sel).html());

  template.find('.labelUserName').text('@'+data.username);
  switch(data.type) {
    case "html":
      template.find('.card-text').html($.parseHTML(data.message));
    break;
    case "text":
      template.find('.card-text').text(data.message);
    break;
  }

  $(selectorChatContent).prepend(template);
}
