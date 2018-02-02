const bot = require('./../lib/bot.js');
const helpBot = require('./help-bot.js');
const registerBot = requr-botire('./registe.js');
const initBot = new bot();

initBot.add(helpBot);
initBot.add(registerBot);

module.exports = initBot;