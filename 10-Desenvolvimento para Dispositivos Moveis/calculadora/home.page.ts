export class HomePage {
  num1: string;
  num2: string;
  resultado: string;

  constructor() { }

  somar() {
    var n1 = parseFloat(this.num1);
    var n2 = parseFloat(this.num2);
    var soma = n1 + n2;
    this.resultado = soma.toString();
  }

  subtrair() {
    var n1 = parseFloat(this.num1);
    var n2 = parseFloat(this.num2);
    var subtracao = n1 - n2;
    this.resultado = subtracao.toString();
  }

  dividir() {
    var n1 = parseFloat(this.num1);
    var n2 = parseFloat(this.num2);
    if (n2 != 0) {
      var divisao = n1 / n2;
      this.resultado = divisao.toString();
    } else {
      this.resultado = "Não foi possível realizar a divisão!";
    }
  }

  multiplicar() {
    var n1 = parseFloat(this.num1);
    var n2 = parseFloat(this.num2);
    var multiplicacao = n1 * n2;
    this.resultado = multiplicacao.toString();
  }
}