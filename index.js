const port = 8090;
const server = require('./app/lib/server.js')(port);
const pages = require('./app/pages/pages.js');

const bot = require('./app/bot/bot.js');
const chat = require('./app/lib/chat.js')(bot);
const io = require('./app/socket-io/index.js');

server.get('/', pages.homePage);
server.assets('assets');
server.libraries([
  'bootstrap',
  'socket.io-client',
  'jquery'
]);

server.init();
io.run(server.getHttpServer(), chat);
server.run();