const http          = require('http');
const routes        = require('./app/lib/routes.js');
const defaultPages  = require('./app/pages/defaultPages.js');
const users         = require('./app/lib/users.js');
const debug         = require('debug');


const logApp        = debug('log::app');
const logSocket     = debug('log::socket');
const logServer     = debug('log::server');


const app           = new routes(logApp);
const dataUsers     = new users();


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

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  logSocket('New client');

  socket.emit('user::askCredentials', null);
  socket.on('user::checkCredentials', (token) => {
    debug('token');
  });
  socket.on('user:newCredentials', () => {

  });

  socket.on('user::msg', (msg) => {
    console.log(msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(app.port, () => {
  logServer(`Listening on port ${app.port}`);
});





