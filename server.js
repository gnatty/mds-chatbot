const http          = require('http');
const routes        = require('./app/lib/routes.js');
const defaultPages  = require('./app/pages/defaultPages.js');
const app           = new routes();
let globalIo;

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
  globalIo = socket;
  console.log(socket.id);
  app.setUser();
  app.getUsers();

  console.log('[SOCKET IO] ========> new client');

  socket.emit('user::welcome', 'connected');

  socket.on('user::msg', (msg) => {
    console.log(msg);
  });

  socket.on('disconnect', () => {
    globalIo = null;
    console.log('user disconnected');
  })
})

server.listen(app.port, () => {
  console.info(`[Server] Listening on port ${app.port}`);
});





