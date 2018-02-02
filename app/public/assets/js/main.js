const io = require('socket.io-client/dist/socket.io.js');
const socket = io();
const actions = require('./actions.js');

let btn = document.querySelector('.btnSendMessage');
let input = document.querySelector('.inputSendMessage');

/**
  * Triger on click button.
  *
  */
btn.addEventListener('click', function() {
  actions.SEND_MESSAGE();
});

/**
  * Triger on presskey 'Enter'
  *
  */
input.addEventListener('keypress', function(event) {
  if(event.code == 'Enter') {
    actions.SEND_MESSAGE(socket);
  }
});

/**
  * SOCKET IO
  *
  */
socket.on('user::newMessage::sender', function(data) {
  actions.SET_MESSAGE('right', data);
});

socket.on('user::newMessage::all', function(data) {
  actions.SET_MESSAGE('left', data);
});