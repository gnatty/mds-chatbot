/**
  * LIB.
  */
const http            = require('http');
const debug           = require('debug');

/**
  * DEBUG VARIABLES.
  */
const logApp          = debug('log::app');
const logSocket       = debug('log::socket');
const logServer       = debug('log::server');

/**
  * PROJECT LIB.
  */
const routes          = require('./app/lib/routes.js');
const users           = require('./app/lib/users.js');
const defaultPages    = require('./app/pages/defaultPages.js');
const bot             = require('./app/bot/bot.js');
const chat            = require('./app/lib/chat.js')(bot);
const io              = require('./app/socket-io/index.js');
const app             = new routes(logApp);
const dataUsers       = new users();

/**
  * APP ROUTER CONFIGURATION.
  */
app.get('/', defaultPages.homePage);
app.get('/about', defaultPages.aboutPage);
app.assets('assets');
app.libraries([
  'bootstrap',
  'socket.io-client',
  'jquery'
]);

const server = http.createServer( (req, res) => {
  app.serveRoute(req, res);
});

io.run(server, chat);

server.listen(app.port, () => {
  logServer(`Listening on port ${app.port}`);
});


