$(document).ready(function(){
  $("#on").click(function(){
    $.ajax({url: "/led/on", success: function(result){
      $('#on').removeClass('btn-success').addClass('btn-secondary');
      $('#off').removeClass('btn-secondary').addClass('btn-danger');
    }});
  });
        
  $("#off").click(function(){
    $.ajax({url: "/led/off", success: function(result){
      $('#on').removeClass('btn-secondary').addClass('btn-success');
      $('#off').removeClass('btn-danger').addClass('btn-secondary');
    }});
  });
});


