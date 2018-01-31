/**
  * Selector
  *
  */
var lastMessage           = "";
var selectorMessage       = ".inputSendMessage";
var selectorSendMessage   = ".btnSendMessage";
var selectorUserToken     = "user::token";
var selectorTemplate      = {
  "left": "#template-message-left",
  "right": "#template-message-right"
};
var selectorChatContent   = '.chat-content';
/**
  * Socket IO
  *
  */
var socket = io();