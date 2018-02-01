const bot           = require('./../lib/bot.js');
const helpBot       = require('./help-bot.js');
const registerBot   = require('./register-bot.js');
const initBot       = new bot();

initBot.add(helpBot);
initBot.add(registerBot);

module.exports = initBot;