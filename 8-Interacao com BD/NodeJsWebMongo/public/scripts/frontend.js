var codigo;

function incluir() {
  $("#oper").val('i');
  $("#cod").val('');
  $("#desc").val('');
  $("#preco").val('');
  $('#caixa-dialogo').modal('show');
}

function editar(codigo) {
  var dados = {
    "codigo": parseInt(codigo)
  };
  $("#oper").val('e');
  $("#cod").val(codigo);
  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: window.location + "produtos/getproduto",
    data: JSON.stringify(dados),
    dataType: 'json',
    success: function(produto) {
      $("#desc").val(produto.descricao);
      $("#preco").val(produto.preco.toFixed(2));
    },
    error: function(erro) {
      alert("ERRO: " + erro);
    }
  });
  
  $('#caixa-dialogo').modal('show');
}
    
function deletar(cod) {
  codigo = cod;
  $('#caixa-confirmacao').modal('show');
}
    
$(document).ready(function() {
  $("#sim-deletar").click(function(evento) {
    evento.preventDefault();
    var dados = {
      "codigo": parseInt(codigo)
    };
        
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: window.location + "produtos/deletar",
      data: JSON.stringify(dados),
      dataType: 'json',
      success: function(produto) {
        $('#caixa-confirmacao').modal('hide');
        window.location.reload();
      },
      error: function(erro) {
        alert("ERRO: " + erro);
      }
    });  
  });
   
  $("#form-produto").submit(function(evento) {
    evento.preventDefault();
    var dados = {
      codigo: parseInt($("#cod").val()),
      descricao: $("#desc").val(),
      preco: parseFloat($("#preco").val())
    };
    var destino = window.location;
    if ($("#oper").val() === 'i')
        destino += "produtos/incluir";
    else if ($("#oper").val() === 'e')
        destino += "produtos/editar";
    
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: destino,
      data: JSON.stringify(dados),
      dataType: 'json',
      success: function(produto) {
        $('#caixa-dialogo').modal('hide');
        window.location.reload();
      },
      error: function(erro) {
        alert("ERRO: " + erro);
      }
    });
  });
});
