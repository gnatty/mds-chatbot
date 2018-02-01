const jwt           = require('jsonwebtoken');
const config        = require('./../../app/config/key.json');

class Users {

  constructor() {
    this.list = [];
    this.loggedToken = [];
    this.jwtSecret = config.jwt_secret;
  }

  new(username) {
    let user = {
      username: username
    };
    this.list.push(user);
  }

  login(username) {

  }

  createToken(username) {
    let token = jwt.sign(
    {
      data: {
        username: username
      }
    }, 
    this.jwtSecret, 
    { 
      expiresIn: 60 * 60 
    }
  );
    return token;
  }

  decodeToken(token) {
    let decoded = jwt.verify(token, this.jwtSecret);
    return decoded;
  }

  ifEmptyToken(token) {
    if(typeof token == 'undefined' || token == "") {
      return true;
    }
    return false;
  }

}

module.exports = Users;