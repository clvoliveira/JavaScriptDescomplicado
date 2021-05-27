export class HomePage {
  peso: string;
  altura: string;
  opcao: string;
  mensagem: string;
  constructor() { }
  calcularIMC() {
    var peso = parseFloat(this.peso);
    var altura = parseFloat(this.altura);
    var imc = peso / Math.pow(altura, 2);
    if (this.opcao == "f") {
      if (imc < 19.1)
        this.mensagem = "Você está abaixo do peso";
      else if (imc < 25.8)
        this.mensagem = "Você está com o peso normal";
      else
        this.mensagem = "Você acima do peso";
    } else if (this.opcao == "m") {
      if (imc < 20.7)
        this.mensagem = "Você está abaixo do peso";
      else if (imc < 26.4)
        this.mensagem = "Você está com o peso normal";
      else
        this.mensagem = "Você acima do peso";
    } else {
      this.mensagem = "Entre com todos os dados!";
    }
  }
}