const port = 8090;
const server = require('./app/server/lib/server.js')(port);
const pages = require('./app/server/pages/pages.js');
const bot = require('./app/server/bot/bot.js');
const chat = require('./app/server/lib/chat.js')(bot);
const io = require('./app/server/socket-io/index.js');

server.get('/', pages.homePage);
server.assets('assets');
server.libraries([
  'bootstrap',
  'socket.io-client'
]);

server.init();
io.run(server.getHttpServer(), chat);
server.run();