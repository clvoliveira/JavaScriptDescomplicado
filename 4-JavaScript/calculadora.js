function String2Number(valor) {
  valor = valor.replace(",", ".");
  return(parseFloat(valor));
}

function digito(dig) {
  if (res.value.length < 12) {
    if (res.value != "0")
      res.value = res.value + dig;
    else
      res.value = dig;
  }
}

function total() {
  if (op.value === "+")
    res.value = parseFloat(v1.value) + parseFloat(res.value);
  else if (op.value === "-")
    res.value = parseFloat(v1.value) - parseFloat(res.value);
  else if (op.value === "X")
    res.value = parseFloat(v1.value) * parseFloat(res.value);
  else if (op.value === "/") {
    if (res.value !== 0)
      res.value = parseFloat(v1.value) / parseFloat(res.value);
    else
      res.value = "Erro!";
  }
}

function operacao(ope) {
  v1.value = res.value;
  op.value = ope;
  res.value = "0";  
}

function separador() { 
  if (res.value.indexOf(",") < 0)
    res.value = res.value + ",";
}

function limpar() {
  res.value = "0";
}

function retornar() {
  window.opener.valor.value =
    res.value;
  window.close();
}
