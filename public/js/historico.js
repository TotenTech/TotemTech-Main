function abrirModal() {
    document.getElementById('modal-relatorio').showModal();
    document.getElementById('modal-relatorio').style.display = 'flex';
  }
  
  function fecharModal() {
    document.getElementById('modal-relatorio').close();
    document.getElementById('modal-relatorio').style.display = 'none';
  }
  
  function gerarPDF() {
    var selectedDates = document.getElementById('data-relatorio').value;
    var datesArray = selectedDates.split(', ');
  
    var doc = new jsPDF();
    doc.text('Relatório dos dias selecionados:', 10, 10);
    datesArray.forEach(function(date, index) {
      doc.text(date, 10, 20 + (index * 10));
    });
    doc.save('relatorio.pdf');
  
    fecharModal();
  }
  
  // Inicializa o Flatpickr
  flatpickr("#data-relatorio", {
    // mode: "multiple",
    mode: "range",
    dateFormat: "Y-m-d",
  });