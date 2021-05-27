const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const cliente = new MongoClient(url, { useNewUrlParser: true });

cliente.connect(function(erro) {
  assert.equal(null, erro);
  console.log("Conectado!");
  const banco = cliente.db('loja');
  banco.collection('produtos').deleteOne(
    { codigo: 10 }
  );
          
  console.log("Excluído!");
  cliente.close();
});

