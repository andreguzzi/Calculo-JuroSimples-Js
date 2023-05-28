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
  var valorFormatado = parseFloat(valor.replace(',', '.')).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  var cellDtinicio = linha.insertCell(2);
  var celldataVencimento = linha.insertCell(3);
  var celltaxaJuros = linha.insertCell(4);
  var cellBloqueio = linha.insertCell(5);
  var celldifDias = linha.insertCell(6);
  var cellJuros = linha.insertCell(7);
  var cellValorLiquido = linha.insertCell(8);
  var dataInicioFormatada = new Date(dataInicio).toLocaleDateString('pt-BR');
  var dataVencimentoFormatada = new Date(dataVencimento).toLocaleDateString('pt-BR');
  var difDias = calcularDiferenca(dataInicio, dataVencimento, bloqueio);
  var juros = calcularJuros(valor, taxaJuros, difDias) / 100;
  var valorTotal = parseFloat(valor.replace(",", ".")) - parseFloat(juros);


  cellCodigo.innerHTML = titulos.rows.length - 2;
  cellValor.textContent = 'R$ ' + valorFormatado;
  cellDtinicio.innerHTML = dataInicioFormatada;
  celldataVencimento.innerHTML = dataVencimentoFormatada;
  celltaxaJuros.innerHTML = taxaJuros + '%';
  cellBloqueio.innerHTML = bloqueio;
  celldifDias.innerHTML = difDias;
  cellJuros.textContent = 'R$ ' + parseFloat(juros).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  cellValorLiquido.textContent = 'R$ ' + parseFloat(valorTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  preencheCamposForm();
  atualizarTotais();
}

/*
  function alTitulo() {
    var codigo = document.getElementById("txtCodigo").value;
    var tabela = document.getElementById("tbtitulos");
    var linhas = tabela.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

    for (var i = 0; i < linhas.length; i++) {
      var linhaCodigo = linhas[i].cells[0].innerText;

      if (linhaCodigo === codigo) {
        var valor = parseFloat(document.getElementById("valor").value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        var dataInicio = new Date(document.getElementById("dataInicio").value).toLocaleDateString('pt-BR');
        var dataVencimento = new Date(document.getElementById("dataVencimento").value).toLocaleDateString('pt-BR');

        linhas[i].cells[1].innerText = valor;
        linhas[i].cells[2].innerText = dataInicio;
        linhas[i].cells[3].innerText = dataVencimento;
        linhas[i].cells[4].innerText = document.getElementById("taxaJuros").value;
        linhas[i].cells[5].innerText = document.getElementById("bloqueio").value;
        break;
      }
    }

    atualizarTotais();
    limparFormulario();
  }
*/


function alTitulo() {
  var codigo = document.getElementById("txtCodigo").value;
  var tabela = document.getElementById("tbtitulos");
  var linhas = tabela.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

  for (var i = 0; i < linhas.length; i++) {
    var linhaCodigo = linhas[i].cells[0].innerText;

    if (linhaCodigo === codigo) {
      var dataInicio = new Date(document.getElementById("dataInicio").value).toLocaleDateString('pt-BR');
      var dataVencimento = new Date(document.getElementById("dataVencimento").value).toLocaleDateString('pt-BR');
      //var valor = parseFloat(document.getElementById("valor").value).toFixed(2);

      linhas[i].cells[1].innerText = "R$ " + valor.value;
      linhas[i].cells[2].innerText = dataInicio;
      linhas[i].cells[3].innerText = dataVencimento;
      linhas[i].cells[4].innerText = document.getElementById("taxaJuros").value;
      linhas[i].cells[5].innerText = document.getElementById("bloqueio").value;
      break;
    }
  }

  atualizarTotais();
  limparFormulario();
}

function delRegistro() {
  var codigo = document.getElementById("txtCodigo").value;
  var tabela = document.getElementById("tbtitulos");
  var linhas = tabela.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

  for (var i = 0; i < linhas.length; i++) {
    var linhaCodigo = linhas[i].cells[0].innerText;

    if (linhaCodigo === codigo) {
      linhas[i].remove();
      break;
    }
  }
  limparFormulario();
  atualizarTotais();
}

function preencheCamposForm() {
  var titulos = document.getElementById("tbtitulos");

  for (var i = 0; i < titulos.rows.length; i++) {
    titulos.rows[i].onclick = function () {
      var index = this.rowIndex;
      document.getElementById("txtCodigo").value = titulos.rows[index].cells[0].innerText;
      document.getElementById("valor").value = titulos.rows[index].cells[1].innerText;
      document.getElementById("dataInicio").value = formatarData(titulos.rows[index].cells[2].innerText);
      document.getElementById("dataVencimento").value = formatarData(titulos.rows[index].cells[3].innerText);
      document.getElementById("taxaJuros").value = titulos.rows[index].cells[4].innerText;
      document.getElementById("bloqueio").value = titulos.rows[index].cells[5].innerText;
    };
  }
}

function formatarData(data) {
  var partesData = data.split("/");
  var dataFormatada = partesData[2] + "-" + partesData[1] + "-" + partesData[0];
  return dataFormatada;
}

function calcularDiferenca(dataInicio, dataVencimento, bloqueio) {
  var dataInicioObj = new Date(dataInicio);
  var dataVencimentoObj = new Date(dataVencimento);

  var timeDiff = Math.abs(dataVencimentoObj.getTime() - dataInicioObj.getTime());
  var difDias = Math.ceil(timeDiff / (1000 * 3600 * 24));

  difDias = difDias + parseInt(bloqueio);

  return difDias;
}

function calcularJuros(valor, taxaJuros, difDias) {
  var valorFloat = parseFloat(valor.replace(",", "."));
  var taxaFloat = parseFloat(taxaJuros.replace(",", "."));
  var juros = valorFloat * taxaFloat * (difDias / 30);

  return juros;
}


function atualizarTotais() {
  var tabela = document.getElementById("tbtitulos");
  var linhas = tabela.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
  var totalValor = 0;
  var totalJuros = 0;
  var totalValorLiquido = 0;

  for (var i = 0; i < linhas.length; i++) {
    var valor = parseFloat(linhas[i].cells[1].innerText.replace("R$ ", "").replace(".", "").replace(",", "."));
    var juros = parseFloat(linhas[i].cells[7].innerText.replace("R$ ", "").replace(".", "").replace(",", "."));
    var valorLiquido = parseFloat(linhas[i].cells[8].innerText.replace("R$ ", "").replace(".", "").replace(",", "."));

    totalValor += valor;
    totalJuros += juros;
    totalValorLiquido += valorLiquido;
  }

  var formatOptions = {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  };

  var totalValorFormatado = totalValor.toLocaleString('pt-BR', formatOptions);
  var totalJurosFormatado = totalJuros.toLocaleString('pt-BR', formatOptions);
  var totalValorLiquidoFormatado = totalValorLiquido.toLocaleString('pt-BR', formatOptions);

  document.getElementById("totalValor").innerText = totalValorFormatado;
  document.getElementById("totalJuros").innerText = totalJurosFormatado;
  document.getElementById("totalValorLiquido").innerText = totalValorLiquidoFormatado;
}

function limparFormulario() {
  document.getElementById("txtCodigo").value = "";
  document.getElementById("dataInicio").value = "";
  document.getElementById("taxaJuros").value = "";
  document.getElementById("bloqueio").value = "";
  document.getElementById("valor").value = "";
  document.getElementById("dataVencimento").value = "";
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

