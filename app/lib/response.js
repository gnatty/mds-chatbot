const fs    = require('fs');
const path  = require('path');
const mime  = require('mime-types');

class Response {

  constructor(res) {
    this.res = res;
  }

  returnJson(code, data) {
    this.res.writeHead(code, {'Content-Type': 'application/json'});
    this.res.write(data);
    this.res.end();
  }

  returnView(path) {
    console.log(path);
    fs.readFile(path, 'utf8', (err, data) => {
      if(err) { 
        this.returnJson(400, "ok");
      } else {
        this.res.writeHead(200, {'Content-Type': 'text/html'});
        this.res.write(data);
        this.res.end();
      }
    });
  } 

  returnAssets(uriPath) {
    let filePath      = "." + uriPath;
    let fileExtension = path.extname(filePath);
    let fileMineType  = mime.lookup(fileExtension);
    
    fs.readFile(filePath, 'utf8', (err, data) => {
      if(err) { 
        this.returnJson(400, "ok");
      } else {
        this.res.writeHead(200, {'Content-Type': fileMineType});
        this.res.write(data);
        this.res.end();
      }
    });
  } 

  returnLibrary(uriPath) {
    let filePath = "./node_modules" + (uriPath.replace("/lib", ""));
    let fileExtension = path.extname(filePath);
    let fileMineType  = mime.lookup(fileExtension);

    fs.readFile(filePath, 'utf8', (err, data) => {
      if(err) { 
        console.log("error");
        this.returnJson(400, "ok");
      } else {
        this.res.writeHead(200, {'Content-Type': fileMineType});
        this.res.write(data);
        this.res.end();
      }
    });
  }

}

module.exports = Response;
