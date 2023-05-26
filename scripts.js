var titulos, index;
var totalValor = 0;
var totalJuros = 0;
var totalValorLiquido = 0;
var dataInicioFormatada, dataVencimentoFormatada; // Variáveis globais

function cadTitulo(valor, dataInicio, dataVencimento, taxaJuros, bloqueio) {
  var titulos = document.getElementById("tbtitulos");
  var tbody = titulos.getElementsByTagName("tbody")[0]; // Obtém o tbody
  var linha = tbody.insertRow(-1);

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

cellDtinicio.innerHTML = dataInicioFormatada;
celldataVencimento.innerHTML = dataVencimentoFormatada;

  cellCodigo.innerHTML = titulos.rows.length-2;
  cellValor.textContent = 'R$ ' + parseFloat(valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
 // cellValor.innerHTML = valor;
  
 // cellDtinicio.innerHTML = dataInicio;
// celldataVencimento.innerHTML = dataVencimento;

  celltaxaJuros.innerHTML = taxaJuros;
  cellBloqueio.innerHTML = bloqueio;
  

  var difDias = calcularDiferenca(dataInicio, dataVencimento);
  var juros = calcularJuros(valor, taxaJuros, difDias) / 100;
  var valorTotal = parseFloat(valor.replace(",", ".")) - parseFloat(juros);

  celldifDias.innerHTML = difDias;
  cellJuros.textContent = 'R$ ' + parseFloat(juros).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  //cellJuros.innerHTML = juros.toFixed(2);
  cellValorLiquido.textContent = 'R$ ' + parseFloat(valorTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
//  cellValorLiquido.innerHTML = valorTotal.toFixed(2);

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
  var titulos = document.getElementById("tbtitulos");
  var rows = titulos.rows;
  for (var i = 0; i < rows.length; i++) {
    rows[i].onclick = (function(index) {
      return function () {
        var cells = rows[index].cells;
        
        document.getElementById("txtCodigo").value = cells[0].innerText;
        document.getElementById("valor").value = cells[1].innerText;
        // document.getElementById("dataInicio").value = cells[2].innerText;
        // document.getElementById("dataVencimento").value = cells[3].innerText;
        document.getElementById("dataInicio").value = dataInicioFormatada;
        document.getElementById("dataVencimento").value = dataVencimentoFormatada;
        document.getElementById("taxaJuros").value = cells[4].innerText;
        document.getElementById("bloqueio").value = cells[5].innerText;
      };
    })(i);
  }
}

/*
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
*/
function atualizarTotais() {
  var tabela = document.getElementById("tbtitulos");
  var linhas = tabela.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
  var totalValor = 0;
  var totalJuros = 0;
  var totalValorLiquido = 0;

  for (var i = 0; i < linhas.length; i++) {
      var valor = parseFloat(linhas[i].cells[1].innerText.replace("R$ ", ""));
      var juros = parseFloat(linhas[i].cells[7].innerText.replace("R$ ", ""));
      var valorLiquido = parseFloat(linhas[i].cells[8].innerText.replace("R$ ", ""));

      totalValor += valor;
      totalJuros += juros;
      totalValorLiquido += valorLiquido;

      
  }
  document.getElementById("totalValor").innerText = "R$ " + totalValor.toFixed(2);
  document.getElementById("totalJuros").innerText = "R$ " + totalJuros.toFixed(2);
  document.getElementById("totalValorLiquido").innerText = "R$ " + totalValorLiquido.toFixed(2);
  
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

