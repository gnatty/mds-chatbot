var socket = io();

socket.on('user::welcome', function(data) {
  console.log(data);
});

function sendMessage(msg) {
  socket.emit('user::msg', msg);
}