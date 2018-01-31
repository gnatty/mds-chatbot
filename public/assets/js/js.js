/**
  * Get current user input message.
  *
  */
var saveLastMessage = function getUserMessage() {
  lastMessage = $(selectorMessage).val();
  $(selectorMessage).val("");
}

var getUserMessage = function getUserMessage() {
  return lastMessage;
}

/**
  * Action on send button click.
  *
  */
$(selectorSendMessage).on("click", function(event) {
  $(selectorMessage).trigger("enterKey");
});

/**
  * Action on input key enter.
  *
  */
$(selectorMessage).on('keyup', function(event) {
  event.preventDefault();
  if(event.keyCode === 13) {
    $(selectorMessage).trigger("enterKey");
  }
});

/**
  * Action send message.
  *
  */
$(selectorMessage).bind("enterKey", function(event) {
  event.preventDefault();
  saveLastMessage();
  sendMessage();
});

