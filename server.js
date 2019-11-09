"use strict";

const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');

//include my own Modules
const dt = require('./dateAndTime');

//test
console.log(dt.myDateTime());

const port = 8080;
const server = http.createServer();

// buffer example
let buf = new Buffer('This is my pretty example');
let json = JSON.stringify(buf);

let buf2 = new Buffer(JSON.parse(json).data);
console.log(buf2.toString());

process.stdin.setEncoding('utf-8');
process.stdin.on('readable', function(){
  var input = process.stdin.read();

  if (input !== null){
    //echo text
    process.stdout.write(input);
    var command = input.trim();
    if (command == 'exit'){
      process.exit(0);
    }
  }
});



server.on('request', function (req,res) {
  fs.readFile('demo1.html',function (err,data){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    console.log(data);
    res.end();
  });
  console.log(`Client app is serving locally on port ${port}`);
});

server.listen(port);
