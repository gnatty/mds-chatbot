
socket.on('user::askCredentials', function(data) {
  var userToken = getUserToken();
  if(userToken === null || userToken.length < 30) {
    console.log('null');
  } else {
    console.log('no null');
  }
});

function sendMessage(msg) {
  socket.emit('user::msg', msg);
}