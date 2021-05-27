var fs = require('fs');
var http = require("http");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
 
var servidor = app.listen(8080, function() {
  var porta = servidor.address().port;
  console.log("Servidor executando na porta %s", porta);
});

app.get('/', function (req, res) {
  fs.readFile('formulario.html', function(erro, dado) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(dado);
    res.end();
  });
});

app.post('/idade', urlencodedParser, function (req, res){
  fs.readFile('idade.html', function(erro, dado) {
    var hoje = new Date();
    var valores = {
      'nome': req.body.nome,
      'anonasc': req.body.anonasc,
      'idade': (hoje.getFullYear() - parseInt(req.body.anonasc))
    };
    for (var chave in valores) {
      dado = dado.toString().replace("{{" + chave + "}}", valores[chave]);
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(dado);
    res.end();
  });
});
