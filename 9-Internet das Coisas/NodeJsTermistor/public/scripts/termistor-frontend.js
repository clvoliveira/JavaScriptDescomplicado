function atualizar() {
  $("#temperatura").html('...'); 
  $.ajax({
    type: "POST",
    contentType: "text/plain",
    url: window.location + "obter/temperatura",
    success: function(dados) {
      $("#temperatura").html(dados);
      window.setTimeout(atualizar, 60000);
    },
    erro: function(erro) {
      console.log("Erro: " + erro);  
    }
  });
}

$(document).ready(function() {
  atualizar();
});
