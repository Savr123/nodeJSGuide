"use strict";

const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
const events =require('events');
const util = require('util');
  /* util.inherits() - позволяет одному конструктору унаследовать
      методы прототипа другого - суперконструктора */

function InputChecker (name, file){
  this.name = name;
  this.writeStream = fs.createWriteStream('./' + file + '.txt',{
    'flags': 'a',
    'encoding': 'utf-8',
    'mode': 0o666
  });
}

util.inherits(InputChecker, events.EventEmitter);
InputChecker.prototype.check = function check(input){
  // удаление лишних пропусков
  let command = input.trim().substr(0,3);

  // обработка команды
  // команда wr: входные данные записываются в файл
  if (command == 'wr:'){
    this.emit('write', input.substr(3, input.length));

    // Команда en: процесс завершается
  }else if (command =='en:'){
    this.emit('end');

    // Эхо-вывод в стандартный выходной поток
  }else{
    this.emit('echo', input);
  }
};

// Тестирование нового объекта и обработки событий
let ic = new InputChecker('Shelley','output');
var data = 'Абра-Кадабра Сим-Салабим'
  ic.on('write', function(data) {   this.writeStream.write(data, 'utf8'); });
  ic.on('echo', function( data) {   process.stdout.write(ic.name + ' wrote ' + data); });
  ic.on('end', function() {   process.exit(); });

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
var em = new events.EventEmitter();
// em.on()

//test inside test
const eventEmitter = require('events').EventEmiter;
var counter = 0;

// setInterval(function(){
//   em.emit('timed', counter++);
// }, 3000);

em.on('timed', function(data){
  console.log('timed' + data);
});

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
    ic.check(input)
  }
});




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
