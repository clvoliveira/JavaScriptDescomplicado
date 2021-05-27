var five = require("johnny-five");
var fs = require('fs');
var http = require("http");
var express = require('express');
var bodyParser = require('body-parser');
var mariadb = require('mariadb');
var app = express();
var arduino = new five.Board();
var temp = 0.0;
var pool = mariadb.createPool({
  host: 'localhost',
  database: 'iot',
  user:'root', 
  password: ''
});

arduino.on("ready", function() {
  var A0 = new five.Sensor("A0");
  A0.on("change", function() {
    temp = getTemperatura(this.value);
  });
});

var servidor = app.listen(8080, function() {
  var porta = servidor.address().port;
  console.log("Servidor executando na porta %s", porta);
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  fs.readFile('termistor.html', function(erro, dado) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(dado);
    res.end();
  });
});

app.post('/obter/temperatura', function(req, res){
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(temp.toFixed(1));
  res.end();
  inserir(temp.toFixed(1));
});

app.get('/relacao/temperatura', function (req, res) {
  pool.getConnection()
  .then(con => {
    con.query("SELECT DATE_FORMAT(data_hora, '%d/%m/%Y %H:%i') AS data_hora, valor FROM temperatura ORDER BY data_hora DESC")
    .then(registros => {
      res.render('historico.ejs', { dados: registros });
      con.end();
    })
    .catch(erro => {
      console.log("Erro comando: " + erro); 
      con.end();
    });
  }).catch(erro => {
    console.log("Erro conexão:" + erro);
  });
});

function getTemperatura(volts) {
  var tempK, tempC;
  tempK = Math.log(10000.0 * (1024.0 / volts - 1));
  tempK = 1 / (0.001129148 + (0.000234125 + (0.0000000876741 * tempK * tempK)) * tempK);
  tempC = tempK - 273.15;
  return tempC;
}

function inserir(valor) {
  pool.getConnection()
  .then(con => {
    con.query("INSERT INTO temperatura VALUES (?, NOW())", [valor])
    .then((res) => {
      console.log(res);
      con.end();
    })
    .catch(erro => {
      console.log("Erro comando: " + erro); 
      con.end();
    });
  }).catch(erro => {
    console.log("Erro conexão:" + erro);
  });
}
