var five = require("johnny-five");
var ThingSpeakClient = require('thingspeakclient');

var arduino = new five.Board();
var cliente = new ThingSpeakClient();
var chave = 'VNQAJ67H5TMAPJRX';
var canal = 791662;
var intervalo = 600000;

arduino.on("ready", function() {
  var A0 = new five.Sensor({
    pin: "A0", 
    freq: intervalo});

  A0.on("data", function() {
    var temp = getTemperatura(this.value);
    cliente.attachChannel(canal, { writeKey:chave}, function(erro, resp) {
      if (!erro) {
        console.log('Conectado ao canal!');
      }
      else {
        console.log('ERRO: ' + erro);
      }
    });
    
    cliente.updateChannel(canal, {field1: temp.toFixed(1)}, function(erro, resp) {
      if (!erro && resp > 0) {
        console.log('Enviado: ' + temp.toFixed(1) + '°C. Resposta: ' + resp);
        console.log();
      }
      else {
        console.log('ERRO: ' + erro);
      }
    });
  });
});

function getTemperatura(volts) {
  var tempK, tempC;
  tempK = Math.log(10000.0 * (1024.0 / volts - 1));
  tempK = 1 / (0.001129148 + (0.000234125 + (0.0000000876741 * tempK * tempK)) * tempK);
  tempC = tempK - 273.15;
  return tempC;
}
