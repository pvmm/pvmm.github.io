"use strict";

let fs   = require('fs');
let http = require("http");

http.createServer(function (request, response) {
  console.log("request.url = ", request.url);
  if (request.url == '/') {
    fs.createReadStream(`${__dirname}/app/index.html`).pipe(response);
  } else {
    if (fs.existsSync(`${__dirname}/app/${request.url}`)) {
      fs.createReadStream(`${__dirname}/app` + request.url).pipe(response);
    } else {
      console.log(`File not found: ${request.url}`);
      fs.createReadStream(`${__dirname}/app/index.html`).pipe(response);
    }
  }
}).listen(8000);

console.log('Listening on port 8000.');
