
window.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.ID_USUARIO == undefined) {
        window.location.href = "/erro";
    }
})


// Definir telas disponiveis por nivel de acesso
if(sessionStorage.TIPO_USUARIO == "1"){
    const screenGerenciarUsuario = document.getElementById("screenGerenciarUsuarioLi");
    screenGerenciarUsuario.style.display = "none";
}

//Definir o nome do usuário e empresa
const nameUser = document.getElementById('spanNameUser');
const nameCompany = document.getElementById('spanNameCompany');
nameUser.innerHTML = `${sessionStorage.NOME_USUARIO}`;
nameCompany.innerHTML = `${sessionStorage.NOME_EMPRESA}`;


// select totens
function filtrarTotens() {
    // Obtém o valor selecionado no menu de filtro
    var filtro = document.getElementById("selecao-filtro").value;
  
    // Obtém todas as linhas da tabela
    var linhas = document.getElementById("corpo_tabela").getElementsByTagName("tr");
  
    // Percorre todas as linhas da tabela
    for (var i = 0; i < linhas.length; i++) {
      var linha = linhas[i];
      var idTotem = linha.getAttribute("id");
  
      // Se o filtro for "todos" ou se o ID do totem corresponder ao filtro selecionado
      if (filtro === "totens" || filtro === idTotem) {
        // Exibe a linha
        linha.style.display = "";
      } else {
        // Oculta a linha
        linha.style.display = "none";
      }
    }
  }
  
  //"seleciona uma data"
  function filtrarDados() {
    // var filtroTotens = document.getElementById("selecao-filtro").value;
    var filtroData = document.getElementById("data").value;
  
    var linhas = document.getElementById("corpo_tabela").getElementsByTagName("tr");
    for (var i = 0; i < linhas.length; i++) {
      var linha = linhas[i];
      var data = linha.cells[1].innerText.split(' ')[0];
  
      //var correspondeTotens = (filtroTotens === "totens" || totem === filtroTotens);
      var correspondeData = (!filtroData || data === filtroData);
  
      if (correspondeData) {
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
  
  document.addEventListener('DOMContentLoaded', function () {
    chamarMetodos();
  });
  
  function chamarMetodos() {
    // Carregar os dados dos últimos 30 dias ao carregar a página
    carregarUltimos30Dias();
  
    // Adicionar evento para o formulário de filtro
    document.getElementById('dateForm').addEventListener('submit', function (event) {
      event.preventDefault();
      buscarHistoricoUsuario();
    });
  }
  
  function carregarUltimos30Dias() {
    fetch("/dashboard/buscarUltimos30Dias", {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
      }
    })
      .then(function (resposta) {
        if (resposta.ok) {
          resposta.json().then(function (resposta) {
            atualizarHistorico(resposta);
            contarInterrupcoesPorMotivoUltimos30Dias();
          });
        } else {
          console.error("Erro na requisição:", resposta.status);
        }
      })
      .catch(function (erro) {
        console.error("Erro ao processar requisição:", erro);
      });
  }
  
  function buscarHistoricoUsuario() {
    const startDate = document.getElementById('start_date').value;
    const endDate = document.getElementById('end_date').value;
  
    fetch(`/dashboard/buscarInterrupcoes?start_date=${startDate}&end_date=${endDate}`, {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
      }
    })
      .then(function (resposta) {
        if (resposta.ok) {
          resposta.json().then(function (resposta) {
            atualizarHistorico(resposta);
            contarInterrupcoesPorMotivo();
          });
        } else {
          console.error("Erro na requisição:", resposta.status);
        }
      })
      .catch(function (erro) {
        console.error("Erro ao processar requisição:", erro);
      });
  }
  
  function contarInterrupcoesPorMotivoUltimos30Dias() {
    fetch("/dashboard/contarInterrupcoesPorMotivoUltimos30Dias", {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
      }
    })
      .then(function (resposta) {
        if (resposta.ok) {
          resposta.json().then(function (resposta) {
            atualizarContagemInterrupcoes(resposta);
          });
        } else {
          console.error("Erro na requisição:", resposta.status);
        }
      })
      .catch(function (erro) {
        console.error("Erro ao processar requisição:", erro);
      });
  }
  
  function contarInterrupcoesPorMotivo() {
    const startDate = document.getElementById('start_date').value;
    const endDate = document.getElementById('end_date').value;
  
    fetch(`/dashboard/contarInterrupcoesPorMotivo?start_date=${startDate}&end_date=${endDate}`, {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
      }
    })
      .then(function (resposta) {
        if (resposta.ok) {
          resposta.json().then(function (resposta) {
            atualizarContagemInterrupcoes(resposta);
          });
        } else {
          console.error("Erro na requisição:", resposta.status);
        }
      })
      .catch(function (erro) {
        console.error("Erro ao processar requisição:", erro);
      });
  }

  function formatDate(inputDate) {
    let date = new Date(inputDate);
    
    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1; 
    let year = date.getUTCFullYear();
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    let seconds = date.getUTCSeconds();
  
    let timezoneOffset = -240;
    let adjustedDate = new Date(date.getTime() + timezoneOffset * 60000);
    day = adjustedDate.getUTCDate();
    month = adjustedDate.getUTCMonth() + 1;
    year = adjustedDate.getUTCFullYear();
    hours = adjustedDate.getUTCHours();
    minutes = adjustedDate.getUTCMinutes();
    seconds = adjustedDate.getUTCSeconds();
  
    let formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  
    return formattedDate;
  }
  
  function atualizarHistorico(interrupcoes) {
    var lineWhite = document.getElementById('lineWhite');
    lineWhite.innerHTML = ""; // Limpa o conteúdo atual
    for (var c = 0; c < interrupcoes.length; c++) {
      var interrupcao = interrupcoes[c];
      let formattedDate = formatDate(interrupcao.horario);
        if (c % 2 == 0) {
        lineWhite.innerHTML += `
                <div class="lineWhite">
                    <span class="dado">Totem ${interrupcao.nome}</span>
                    <span class="dado">${formattedDate}</span>
                    <span class="dado">${interrupcao.motivo}</span>
                </div>
            `;
      } else {
        lineWhite.innerHTML += `
                <div class="lineDark">
                    <span class="dado">Totem ${interrupcao.nome}</span>
                    <span class="dado">${formattedDate}</span>
                    <span class="dado">${interrupcao.motivo}</span>
                </div>
            `;
      }
    }
  }
  
  function atualizarContagemInterrupcoes(resposta) {
    var cpu = resposta.find(item => item.motivo === 'Cpu');
    var disco = resposta.find(item => item.motivo === 'Disco');
    var ram = resposta.find(item => item.motivo === 'Memória RAM');
    var rede = resposta.find(item => item.motivo === 'Rede');
  
    var totalCpu = cpu ? cpu.total : 0;
    var totalDisco = disco ? disco.total : 0;
    var totalRam = ram ? ram.total : 0;
    var totalRede = rede ? rede.total : 0;
  
    var totalInterrupcoes = totalCpu + totalDisco + totalRam + totalRede;
  
    document.getElementById('spanTotalCpu').innerText = `Cpu: ${totalCpu}`;
    document.getElementById('spanTotalDisco').innerText = `Disco: ${totalDisco}`;
    document.getElementById('spanTotalRam').innerText = `Memória RAM: ${totalRam}`;
    document.getElementById('spanTotalRede').innerText = `Rede: ${totalRede}`;
    document.getElementById('spanNumberTotal').innerText = totalInterrupcoes;
  }

