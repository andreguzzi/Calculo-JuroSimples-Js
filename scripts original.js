var titulos, index;
var totalValor = 0;
var totalJuros = 0;

function cadTitulo(valor, dataInicio, dataVencimento, taxaJuros, bloqueio) {
  titulos = document.getElementById("tbtitulos");
  var qtdlLinhas = titulos.rows.length;
  var linha = titulos.insertRow(qtdlLinhas);

  var cellCodigo = linha.insertCell(0);
  var cellValor = linha.insertCell(1);
  var cellDtinicio = linha.insertCell(2);
  var celldataVencimento = linha.insertCell(3);
  var celltaxaJuros = linha.insertCell(4);
  var cellBloqueio = linha.insertCell(5);
  var celldifDias = linha.insertCell(6);
  var cellJuros = linha.insertCell(7);
  var cellValor = linha.insertCell(8);

  cellCodigo.innerHTML = qtdlLinhas;
  cellValor.innerHTML = valor;
  cellDtinicio.innerHTML = dataInicio;
  celldataVencimento.innerHTML = dataVencimento;
  celltaxaJuros.innerHTML = taxaJuros;
  cellBloqueio.innerHTML = bloqueio;

  var difDias = calcularDiferenca(dataInicio, dataVencimento);
  var juros = calcularJuros(valor, taxaJuros, difDias) / 100;
  var valorTotal = parseFloat(valor.replace(",", ".")) - parseFloat(juros);

  celldifDias.innerHTML = difDias;
  cellJuros.innerHTML = juros.toFixed(2);
  cellValor.innerHTML = valorTotal.toFixed(2);

  preencheCamposForm();
  totalValor += parseFloat(valor.replace(",", "."));
  totalJuros += juros;
  atualizarTotais();
}
//função para alterar
function alTitulo(valor, dataInicio, dataVencimento, taxaJuros, bloqueio) {
  titulos.rows[index].cells[1].innerHTML = valor;
  titulos.rows[index].cells[2].innerHTML = dataInicio;
  titulos.rows[index].cells[3].innerHTML = dataVencimento;
  titulos.rows[index].cells[4].innerHTML = taxaJuros;
  titulos.rows[index].cells[5].innerHTML = bloqueio;

  var difDias = calcularDiferenca(dataInicio, dataVencimento);
  var juros = calcularJuros(valor, taxaJuros, difDias);
  var valorTotal = parseFloat(valor.replace(",", ".")) + parseFloat(juros);

  titulos.rows[index].cells[6].innerHTML = difDias;
  titulos.rows[index].cells[7].innerHTML = juros.toFixed(2);
  titulos.rows[index].cells[1].innerHTML = valorTotal.toFixed(2);

  totalValor += parseFloat(valor.replace(",", ".")) - parseFloat(juros);
  totalJuros += juros;
  atualizarTotais();
}

function delRegistro() {
  if (index >= 0 && index < titulos.rows.length) {
    var valorRemovido = parseFloat(titulos.rows[index].cells[1].innerText.replace(",", "."));
    var jurosRemovido = parseFloat(titulos.rows[index].cells[7].innerText);

    titulos.deleteRow(index);

    totalValor -= valorRemovido;
    totalJuros -= jurosRemovido;
    atualizarTotais();
  }
}
//função para calcular a diferenca de dias entre as datas
function calcularDiferenca(dataInicio, dataVencimento) {
  var dataInicioObj = new Date(dataInicio);
  var dataVencimentoObj = new Date(dataVencimento);

  var timeDiff = Math.abs(dataVencimentoObj.getTime() - dataInicioObj.getTime());
  var difDias = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return difDias;
}

function calcularJuros(valor, taxaJuros, difDias) {
  var valorFloat = parseFloat(valor.replace(",", "."));
  var taxaFloat = parseFloat(taxaJuros.replace(",", "."));
  var valorLiquido = valorFloat;
  var juros = (valorFloat * taxaFloat * (difDias / 30));
  valorLiquido -= juros;

  return juros;
}
//função para calcular o juros simples ao mês
/*
function calcularJuros(valor, taxaJuros, difDias) {
  var valorFloat = parseFloat(valor.replace(",", "."));
  var taxaFloat = parseFloat(taxaJuros.replace(",", "."));
  var valorLiquido = valorFloat + juros;
  var juros = (valorFloat * taxaFloat * (difDias / 30));

  return juros;
}
*/
//função para preencher os dados na tabela
function preencheCamposForm() {
  for (var i = 0; i < titulos.rows.length; i++) {
    titulos.rows[i].onclick = function (i) {
      return function () {
        index = i;
        document.getElementById("txtCodigo").value =
          titulos.rows[index].cells[0].innerText;
        document.getElementById("valor").value =
          titulos.rows[index].cells[1].innerText;
        document.getElementById("dataInicio").value =
          titulos.rows[index].cells[2].innerText;
        document.getElementById("dataVencimento").value =
          titulos.rows[index].cells[3].innerText;
        document.getElementById("taxaJuros").value =
          titulos.rows[index].cells[4].innerText;
        document.getElementById("bloqueio").value =
          titulos.rows[index].cells[5].innerText;
        document.getElementById("difDias").value = difDias;
        document.getElementById("valorLiquido").value = valorLiquido.toFixed(2);
      };
    }(i);
  }
}



function atualizarTotais() {
  document.getElementById("totalValor").innerText = totalValor.toFixed(2);
  document.getElementById("totalJuros").innerText = totalJuros.toFixed(2);
}
/*
function calcularTotal() {
  var totalJuros = 0;
  for (var i = 1; i < titulos.rows.length - 1; i++) {
    var juros = parseFloat(titulos.rows[i].cells[7].innerText);
    var juros = parseFloat(titulos.rows[i].cells[8].innerText);
    totalJuros += juros;
  }

  var totalJurosCell = document.getElementById("totalJuros");
  totalJurosCell.innerText = totalJuros.toFixed(2);
}
*/
/*
function calcularTotal() {
  var total = 0;
  for (var i = 1; i < titulos.rows.length - 1; i++) {
    var valor = parseFloat(titulos.rows[i].cells[1].innerText.replace(",", "."));
    total += valor;
  }

  var linhaTotal = titulos.insertRow(titulos.rows.length - 1);
  var cellTotalLabel = linhaTotal.insertCell(0);
  var cellTotalValue = linhaTotal.insertCell(1);
  var cellTotalJuros = linhaTotal.insertCell(2);
  var cellEmpty = linhaTotal.insertCell(3);
  cellTotalLabel.innerHTML = "Total:";
  cellTotalValue.innerHTML = total.toFixed(2);
  cellTotalJuros.innerHTML = "";
  cellEmpty.innerHTML = "";
}
*/