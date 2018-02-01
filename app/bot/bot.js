const bot           = require('./../lib/bot.js');
const helpBot       = require('./helpBot.js');
const registerBot   = require('./registerBot.js');
const initBot       = new bot();

initBot.add(helpBot);
initBot.add(registerBot);

module.exports = initBot;