const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const cliente = new MongoClient(url, { useNewUrlParser: true });

cliente.connect(function(erro) {
  assert.equal(null, erro);
  console.log("Conectado!");
  const banco = cliente.db('loja');
  var cursor = banco.collection('produtos').find();
  cursor.forEach(function(documento) { 
    console.log("---");
    console.log("Código: " + documento.codigo); 
    console.log("Descrição: " + documento.descricao);
    console.log("Preço: " + documento.preco);
  });  
  cliente.close();
});

