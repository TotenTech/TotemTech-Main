
window.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.ID_USUARIO == undefined) {
    window.location.href = "/erro";
  }
})

//"seleciona uma data"
function filtrarDados() {
  var filtroTotens = document.getElementById("selecao-filtro").value;
  var filtroData = document.getElementById("data").value;

  var linhas = document.getElementById("corpo_tabela").getElementsByTagName("tr");
  for (var i = 0; i < linhas.length; i++) {
    var linha = linhas[i];
    var totem = linha.cells[0].innerText;
    var data = linha.cells[1].innerText.split(' ')[0]; 

    var correspondeTotens = (filtroTotens === "totens" || totem === filtroTotens);
    var correspondeData = (!filtroData || data === filtroData);

    if (correspondeTotens && correspondeData) {
      linha.style.display = ""; 
    } else {
      linha.style.display = "none"; 
    }
  }
}

function abrirModal() {
  // document.getElementById('modal-relatorio').showModal();
  document.getElementById('modal-relatorio').style.display = 'flex';
}

function fecharModal() {
  // document.getElementById('modal-relatorio').close();
  document.getElementById('modal-relatorio').style.display = 'none';
}

function gerarPDF() {
  var selectedDates = document.getElementById('data-relatorio').value;
  var datesArray = selectedDates.split(', ');

  var doc = new jsPDF();
  doc.text('Relatório dos dias selecionados:', 10, 10);
  datesArray.forEach(function (date, index) {
    doc.text(date, 10, 20 + (index * 10));
  });
  doc.save('relatorio.pdf');

  fecharModal();
}


document.getElementById("btn_sair").addEventListener("click", () => {
  sessionStorage.clear();
  window.location.href = "/";
})