var produtos = [];

function inserir() {
  produtos.push({codigo: parseInt(cod.value), descricao: desc.value, preco: parseFloat(prec.value)});
  mostrar();
}

function remover(i) {
  produtos.splice(i, 1);
  mostrar();
}

function mostrar() {
  console.log(JSON.stringify(produtos));
  var conteudo = "<table cellspacing='0' cellpadding='4' border='1'>" +
    "<tr><td>Código</td>" +
    "<td>Descrição</td>" +
    "<td>Preço</td></tr>";
  for (var i in produtos) {
    conteudo += "<tr><td><button onclick='remover(" + 
      i + ")'><image src='deletar.png' height='12px'></button> " + 
      produtos[i].codigo + 
      "</td><td> " + produtos[i].descricao + 
      "</td><td align='right'>" + produtos[i].preco.toFixed(2) + "</td></tr>";
  }
  conteudo += "</table>";
  tabela.innerHTML = conteudo;
}