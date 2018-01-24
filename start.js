"use strict";

const fs   = require('fs');
const http = require("http");

http.createServer(function (request, response) {
  console.log("request.url = ", request.url);
  if (request.url == '/') {
    fs.createReadStream(`${__dirname}/app/index.html`).pipe(response);
  } else {
    fs.createReadStream(`${__dirname}/app` + request.url).pipe(response);
  }
}).listen(8000);

console.log('Listening on port 8000.');
