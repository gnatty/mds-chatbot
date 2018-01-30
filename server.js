const http          = require('http');
const routes        = require('./app/lib/routes.js');
const defaultPages  = require('./app/pages/defaultPages.js');
const app           = new routes();

app.get('/', defaultPages.homePage);
app.get('/about', defaultPages.aboutPage);
app.assets('assets');
app.libraries([
  'bootstrap'
]);

http.createServer( (req, res) => {
  app.serveRoute(req, res);

}).listen(app.port, () => {
  console.info(`[Server] Listening on port ${app.port}`);
});

