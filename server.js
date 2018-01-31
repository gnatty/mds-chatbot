/**
  * LIB.
  */
const http            = require('http');
const debug           = require('debug');
const io              = require('socket.io')

/**
  * PROJECT LIB.
  */
const routes          = require('./app/lib/routes.js');
const defaultPages    = require('./app/pages/defaultPages.js');
const users           = require('./app/lib/users.js');
const socketIoAction  = require('./app/lib/socket-io-action.js');
const chat            = require('./app/lib/chat.js');
/**
  * DEBUG VARIABLES.
  */
const logApp          = debug('log::app');
const logSocket       = debug('log::socket');
const logServer       = debug('log::server');

/**
  * INSTANTIATE.
  */
const app             = new routes(logApp);
const dataUsers       = new users();
const chatUse         = new chat([
  'help',
  'register',
  'login'
]);

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

io(server).on('connection', (socket) => {
  logSocket('New client');
  socketIoAction(socket, logSocket, dataUsers, chatUse);
});

server.listen(app.port, () => {
  logServer(`Listening on port ${app.port}`);
});





