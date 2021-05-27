// https://medium.com/baixada-nerd/criando-um-crud-completo-com-nodejs-express-e-mongodb-parte-3-3-b243d14a403c
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const cliente = new MongoClient(url, { useNewUrlParser: true });

cliente.connect(function(erro) {
  assert.equal(null, erro);
  const banco = cliente.db('loja');

  var servidor = app.listen(8080, function() {
    var porta = servidor.address().port;
    console.log("Servidor executando na porta %s", porta);
  });
  
  app.use(express.static("public"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.set('view engine', 'ejs');

  app.get('/', (req, res) => {
    banco.collection('produtos').find().toArray((erro, resultado) => {
      assert.equal(null, erro);
      res.render('index.ejs', { dados: resultado });
    });
  });

  app.post("/produtos/incluir", function(req, res){
    var produto = req.body;
    console.log('Incluir produto: ' + JSON.stringify(produto));
    banco.collection('produtos').insertOne(produto, function(erro, res) {
      assert.equal(null, erro);
      console.log("1 documento inserido.");
    });
    return res.send(produto);
  });
  
  app.post("/produtos/editar", function(req, res){
    var produto = req.body;
    console.log('Alterar produto: ' + JSON.stringify(produto));
    banco.collection('produtos').updateOne({codigo: produto.codigo}, {$set: produto}, function(erro, res) {
      assert.equal(null, erro);
      console.log("1 documento alterado.");
    });
    return res.send(produto);
  });
  
  app.post("/produtos/deletar", function(req, res){
    var produto = req.body;
    console.log('Excluir produto: ' + JSON.stringify(produto));
    banco.collection('produtos').deleteOne(produto, function(erro, res) {
      assert.equal(null, erro);
      console.log("1 documento excluído.");
    });
    return res.send(produto);
  });
  
  app.post("/produtos/getproduto", function(req, res){
    var produto = req.body;
    console.log('Produto: ' + JSON.stringify(produto));
    banco.collection('produtos').findOne(produto, function(erro, item) {
      assert.equal(null, erro);
      return res.send(item);
    });
  });
});
