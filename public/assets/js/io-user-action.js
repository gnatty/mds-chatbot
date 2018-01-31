
socket.on('user::askCredentials', function(data) {
  var userToken = getUserToken();
  if(userToken === null || userToken.length < 30) {
    socket.emit('user:newCredentials');
  } else {
    socket.emit('user::checkCredentials', userToken);
  }
});

function sendMessage(msg) {
  socket.emit('user::msg', msg);
}