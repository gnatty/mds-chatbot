
function getUserToken() {
  return localStorage.getItem(selectorUserToken);
}

function setUserToken(token) {
  localStorage.setItem(selectorUserToken, token);
}

function removeUserToken() {
  localStorage.removeItem(selectorUserToken);
}