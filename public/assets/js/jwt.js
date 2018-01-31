
function getUserToken() {
  var token = localStorage.getItem("selectorUserToken");
  if(token == null) {
    return "";
  }
  return token;
}

function setUserToken(token) {
  localStorage.setItem(selectorUserToken, token);
}

function removeUserToken() {
  localStorage.removeItem(selectorUserToken);
}