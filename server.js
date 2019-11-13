const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
const events =require('events');

// include my own Modules
const dt = require('./dateAndTime');

// play with process
function cliCall(){
  process.stdin.setEncoding('utf-8');
  process.stdin.on('readable', function(){
    var input = process.stdin.read();
    if(input!==null){
      process.stdout.write(input);
      debugger;
      if (input.trim()=='exit') {
        process.exit();
      }
    }
  });
};
cliCall();

// test
console.log(dt.myDateTime());

// play with events
var em = new events.EventEmiter();
em.on()

//test inside test
const eventEmitter = require('events').EventEmiter;
var counter = 0;
setInterval(function(){
  em.emit('timed', counter++);
}, 3000);
em.on('timed', function(){
  console.log('timed' + data);
});

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
