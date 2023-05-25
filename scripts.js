var titulos, index;
var totalValor = 0;
var totalJuros = 0;
var totalValorLiquido = 0;
var dataInicioFormatada, dataVencimentoFormatada; // Variáveis globais

function cadTitulo(valor, dataInicio, dataVencimento, taxaJuros, bloqueio) {
  titulos = document.getElementById("tbtitulos");
  var qtdLinhas = titulos.rows.length;
  var linha = titulos.insertRow(qtdLinhas);

  var cellCodigo = linha.insertCell(0);
  var cellValor = linha.insertCell(1);
  var cellDtinicio = linha.insertCell(2);
  var celldataVencimento = linha.insertCell(3);
  var celltaxaJuros = linha.insertCell(4);
  var cellBloqueio = linha.insertCell(5);
  var celldifDias = linha.insertCell(6);
  var cellJuros = linha.insertCell(7);
  var cellValorLiquido = linha.insertCell(8);
  var dataInicioFormatada = new Date(dataInicio).toLocaleDateString('pt-BR');
  var dataVencimentoFormatada = new Date(dataVencimento).toLocaleDateString('pt-BR');


  cellCodigo.innerHTML = qtdLinhas;
  cellValor.innerHTML = valor;
  cellDtinicio.innerHTML = dataInicioFormatada;
  celldataVencimento.innerHTML = dataVencimentoFormatada;
  //cellDtinicio.innerHTML = dataInicio;
  //celldataVencimento.innerHTML = dataVencimento;
  celltaxaJuros.innerHTML = taxaJuros;
  cellBloqueio.innerHTML = bloqueio;

  var difDias = calcularDiferenca(dataInicio, dataVencimento);
  var juros = calcularJuros(valor, taxaJuros, difDias) / 100;
  var valorTotal = parseFloat(valor.replace(",", ".")) - parseFloat(juros);

  celldifDias.innerHTML = difDias;
  cellJuros.innerHTML = juros.toFixed(2);
  cellValorLiquido.innerHTML = valorTotal.toFixed(2);

  preencheCamposForm();
  atualizarTotais();
}

function alTitulo(valor, dataInicio, dataVencimento, taxaJuros, bloqueio) {
  titulos.rows[index].cells[1].innerHTML = valor;
  // titulos.rows[index].cells[2].innerHTML = dataInicio;
  // titulos.rows[index].cells[3].innerHTML = dataVencimento;
  titulos.rows[index].cells[2].innerHTML = dataInicioFormatada;
  titulos.rows[index].cells[3].innerHTML = dataVencimentoFormatada;
  titulos.rows[index].cells[4].innerHTML = taxaJuros;
  titulos.rows[index].cells[5].innerHTML = bloqueio;

  var difDias = calcularDiferenca(dataInicio, dataVencimento);
  var juros = calcularJuros(valor, taxaJuros, difDias) / 100;
  var valorTotal = parseFloat(valor.replace(",", ".")) - parseFloat(juros);

  titulos.rows[index].cells[6].innerHTML = difDias;
  titulos.rows[index].cells[7].innerHTML = juros.toFixed(2);
  titulos.rows[index].cells[8].innerHTML = valorTotal.toFixed(2);

  atualizarTotais();
}

function delRegistro() {
  if (index >= 0 && index < titulos.rows.length) {
    titulos.deleteRow(index);
    preencheCamposForm();
    atualizarTotais();
  }
}

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
  var juros = valorFloat * taxaFloat * (difDias / 30);

  return juros;
}

function preencheCamposForm() {
  for (var i = 0; i < titulos.rows.length; i++) {
    titulos.rows[i].onclick = function (i) {
      return function () {
        index = i;
        document.getElementById("txtCodigo").value = titulos.rows[index].cells[0].innerText;
        document.getElementById("valor").value = titulos.rows[index].cells[1].innerText;
        // document.getElementById("dataInicio").value = titulos.rows[index].cells[2].innerText;
        //  document.getElementById("dataVencimento").value = titulos.rows[index].cells[3].innerText;
        document.getElementById("dataInicio").value = dataInicioFormatada;
        document.getElementById("dataVencimento").value = dataVencimentoFormatada;

        document.getElementById("taxaJuros").value = titulos.rows[index].cells[4].innerText;
        document.getElementById("bloqueio").value = titulos.rows[index].cells[5].innerText;
      };
    }(i);
  }
}

function atualizarTotais() {
  var tabela = document.getElementById("tbtitulos");
  var linhas = tabela.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
  var totalValor = 0;
  var totalJuros = 0;

  for (var i = 0; i < linhas.length; i++) {
    var valorCell = linhas[i].cells[1];
    var jurosCell = linhas[i].cells[7];

    var valor = parseFloat(valorCell.textContent);
    var juros = parseFloat(jurosCell.textContent);

    if (!isNaN(valor)) {
      totalValor += valor;
    }

    if (!isNaN(juros)) {
      totalJuros += juros;
    }
  }
  var totalValorCell = document.getElementById("totalValor");
  var totalJurosCell = document.getElementById("totalJuros");
  
  totalValorCell.textContent = totalValor.toFixed(2);
  totalJurosCell.textContent = totalJuros.toFixed(2);
}


function travarCampo(campo, checkbox) {
  var inputCampo = document.getElementById(campo);
  if (checkbox.checked) {
    // Manter o valor travado
    inputCampo.readOnly = true;
  } else {
    // Desbloquear o valor
    inputCampo.readOnly = false;
    inputCampo.value = ""; // Limpar o valor
  }
}

