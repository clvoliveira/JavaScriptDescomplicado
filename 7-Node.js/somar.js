const readline = require('readline');

const teclado = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

teclado.question('Digite o primeiro valor: ', (valor1) => { 
  teclado.question('Digite o segundo valor: ', (valor2) => {
    var soma = parseInt(valor1) + parseInt(valor2);
    console.log("A soma é " + soma);
    teclado.close();
  });
});





