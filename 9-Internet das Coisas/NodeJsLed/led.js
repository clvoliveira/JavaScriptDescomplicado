var five = require("johnny-five");
var fs = require('fs');
var http = require("http");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var arduino = new five.Board();
console.log("Arduino->Pino 13 (LED)");

var servidor = app.listen(8080, function() {
  var porta = servidor.address().port;
  console.log("Servidor executando na porta %s", porta);
});

app.use(express.static("public"));

app.get('/', function (req, res) {
  fs.readFile('led.html', function(erro, dado) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(dado);
    res.end();
  });
});

arduino.on("ready", function() {
  var led = new five.Led(13);
  
  this.repl.inject({
    led: led
  });
  
  app.get('/led/on', function (req, res) {
    led.on();
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('');
    res.end();
  }); 
  
  app.get('/led/off', function (req, res) {
    led.off();
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('');
    res.end();
  }); 
});
