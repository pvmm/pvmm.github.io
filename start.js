"use strict";

var fs   = require('fs');
var http = require("http");
var path = __dirname;

http.createServer(function (request, response) {
  console.log("request.url = ", request.url);
  if (request.url == '/') {
    fs.createReadStream(path + '/app/index.html').pipe(response);
  } else {
    if (fs.existsSync(path + '/app/' + request.url)) {
      fs.createReadStream(path + '/app' + request.url).pipe(response);
    } else {
      console.log('File not found: ' + request.url);
      fs.createReadStream(path + '/app/index.html').pipe(response);
    }
  }
}).listen(8000);

console.log('Listening on port 8000.');
