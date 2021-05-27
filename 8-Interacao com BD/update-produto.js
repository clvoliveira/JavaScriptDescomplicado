const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const cliente = new MongoClient(url, { useNewUrlParser: true });

cliente.connect(function(erro) {
  assert.equal(null, erro);
  console.log("Conectado!");
  const banco = cliente.db('loja');
  banco.collection('produtos').updateMany(
    { preco: { $lt: 2000 } },
    { $mul: { preco: 0.9 } }
  );
          
  console.log("Alterado!");
  cliente.close();
});

