var titulos, index;

function cadTitulo(valor, dtinicio, dtvcto, txjuros, bloqueio) {
  titulos = document.getElementById("tbtitulos");
  var qtdlLinhas = titulos.rows.length;
  var linha = titulos.insertRow(qtdlLinhas);
  var linhaParam;

  var cellCodigo = linha.insertCell(0);
  var cellValor = linha.insertCell(1);
  var cellDtinicio = linha.insertCell(2);
  var cellDtvcto = linha.insertCell(3);
  var cellTxjuros = linha.insertCell(4);
  var cellBloqueio = linha.insertCell(5);

  cellCodigo.innerHTML = qtdlLinhas;
  cellValor.innerHTML = valor;
  cellDtinicio.innerHTML = dtinicio;
  cellDtvcto.innerHTML = dtvcto;
  cellTxjuros.innerHTML = txjuros;
  cellBloqueio.innerHTML = bloqueio;

  preencheCamposForm();
}

function alTitulo(valor, dtinicio, dtvcto, txjuros, bloqueio) {
  titulos.rows[index].cells[1].innerHTML = valor;
  titulos.rows[index].cells[2].innerHTML = dtinicio;
  titulos.rows[index].cells[3].innerHTML = dtvcto;
  titulos.rows[index].cells[4].innerHTML = txjuros;
  titulos.rows[index].cells[5].innerHTML = bloqueio;
}

function preencheCamposForm() {
  for (var i = 0; i < titulos.rows.length; i++) {
    titulos.rows[i].onclick = function () {
      index = this.rowIndex;
      document.getElementById("txtCodigo").value = titulos.rows[index].cells[0].innerText;
      document.getElementById("valor").value = titulos.rows[index].cells[1].innerText;
      document.getElementById("dtinicio").value = titulos.rows[index].cells[2].innerText;
      document.getElementById("dtvcto").value = titulos.rows[index].cells[3].innerText;
      document.getElementById("txjuros").value = titulos.rows[index].cells[4].innerText;
      document.getElementById("bloqueio").value = titulos.rows[index].cells[5].innerText;
    };
  }
}

function calculojuros() {
  var valorLiquido = "valor" - "juros";
  return valorLiquido;
}

function calculaDias() {
  var d1 = "dtinicio";
  var d2 = "dtvcto";
  var diffInMs = new Date(d2) - new Date(d1);
  var diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return diffInDays;
}

function delRegistro() {
  for (var i = 0; i < titulos.rows.length; i++) {
    if (index == i) {
      titulos.deleteRow(index);
      return;
    }
  }
}
