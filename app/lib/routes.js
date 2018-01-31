const response = require('./response.js');

class Routes {

  constructor(log, port = 'undefined') {
    this.log = log;
    this.port = port !== 'undefined' ? port : 8080;
    this.routes = [];
    this.assetsPath;
    this.librariesPath;
    this.librariesDirName = "lib";
    this.users = 0;
  }

  setUser() {
    this.users++;
  }

  getUsers() {
    this.log(this.users);
  }

  get(path, action) {
    this.addRoute("GET", path, action);
  }

  post(path, action) {
    this.addRoute("POST", path, action);
  }

  addRoute(method, path, action) {
    let searchRes = this.routes.find( (route) => {
      return route.path == path && route.method == method;
    });
    if(typeof searchRes != 'undefined') {
      // --- Throw error.
      this.log(`Route already exist for method ${method} and path ${path}`);
    } else {
      this.routes.push(
        {
          "method"  : method,
          "path"    : path,
          "action"  : action
        }
      );
      this.log(`New Route added\nMethod : ${method}\nPath : ${path}`);
    }
  }

  serveRoute(req, res) {
    let routePath     = req.url;
    let routeMethod   = req.method;
    let resL          = new response(res);

    if( this.isAssets(routePath) ) {
      this.serveAssets(routePath, req, resL);
      return true;
    } else if( this.isLibrary(routePath) ) {
      this.serveLibrary(routePath, req, resL);
      return true;
    }
    let searchRes = this.routes.find( (route) => {
      return route.path == routePath && route.method == routeMethod;
    });

    if(typeof searchRes == 'undefined') {
      // --- Throw error.
      this.errorPage(req, res);
      this.log("Route not found");
    } else {
      searchRes.action(req, resL);
    }
  }

  assets(path) {
    this.assetsPath = path;
  }

  libraries(paths) {
    this.librariesPath = paths;
  }

  isAssets(path) {
    if(typeof this.assetsPath == 'undefined') {
      return false;
    }
    let regex = new RegExp("^\/" + this.assetsPath + "\/(.*)$", "g");
    return regex.test(path);
  }

  isLibrary(path) {
    if(typeof this.librariesPath == 'undefined') {
      return false;
    }
    let pathSplit = path.split('/');
    if( pathSplit.length < 3 || pathSplit[1] != this.librariesDirName ) {
      return false;
    }
    return this.librariesPath.includes(pathSplit[2]);
  }

  errorPage(req, res) {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.write('{"error": "page_not_found"}');
    res.end();
  }

  serveAssets(path, req, res) {
    res.returnAssets(path);
  }

  serveLibrary(path, req, res) {
    res.returnLibrary(path);
  }

}

module.exports = Routes;