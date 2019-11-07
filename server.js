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

server.on('request',function (req,res) {
  fs.readFile('demo1.html',function (err,data){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    console.log(data);
    res.end();
  });
  console.log(`Client app is serving locally on port ${port}`);
});
server.on('connection', function(){
  console.log('connection event');
})

server.listen(port, function(){
  console.log('listening event');
});
