const Bot = require('./../lib/bot.js');
const helpBot = require('./help-bot.js');
const initBot = new Bot();

initBot.add(helpBot);

module.exports = initBot;

