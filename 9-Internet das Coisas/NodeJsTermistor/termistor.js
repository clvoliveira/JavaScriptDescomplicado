var five = require("johnny-five");
var arduino = new five.Board();

arduino.on("ready", function() {
  var A0 = new five.Sensor("A0");

  A0.on("change", function() {
    var temp = getTemperatura(this.value);
    console.log(temp.toFixed(1) + "°C");
  });
});

function getTemperatura(volts) {
  var tempK, tempC;
  tempK = Math.log(10000.0 * (1024.0 / volts - 1));
  tempK = 1 / (0.001129148 + (0.000234125 + (0.0000000876741 * tempK * tempK)) * tempK);
  tempC = tempK - 273.15;
  return tempC;
}
