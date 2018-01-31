/**
  * Get current user input message.
  *
  */
var getUserMessage = function getUserMessage() {
  var msg = $(selectorMessage).val();
  return msg;
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
  console.log(getUserMessage());
  sendMessage(getUserMessage());
});

