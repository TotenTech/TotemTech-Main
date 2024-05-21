
window.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.ID_USUARIO == undefined) {
        window.location.href = "/erro";
    }
})



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

function chamarMetodos() {
    buscarHistoricoUsuario();
    contarInterrupcoesUsuario();
}
function buscarHistoricoUsuario() {
    fetch("/dashboard/buscarInterrupcoes", {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
        }
    })
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    if (resposta.length > 0) {
                        var lineWhite = document.getElementById('lineWhite');
                        lineWhite.innerHTML = ""; // Limpa o conteúdo atual
                        for (var c = 0; c < resposta.length; c++) {
                            var interrupcao = resposta[c];
                            // Formata a data
                            var data = new Date(interrupcao.horario);
                            var dataFormatada = data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear() + " " + data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
                            // Adiciona novo conteúdo

                            if(c % 2 == 0){
                                lineWhite.innerHTML += `
                                <div class="lineWhite">
                                    <span class="dado">Totem ${interrupcao.nome}</span>
                                    <span class="dado">${dataFormatada}</span>
                                    <span class="dado">${interrupcao.motivo}</span>
                                </div>
                            `;
                            } else{
                                lineWhite.innerHTML += `
                                <div class="lineDark">
                                    <span class="dado">Totem ${interrupcao.nome}</span>
                                    <span class="dado">${dataFormatada}</span>
                                    <span class="dado">${interrupcao.motivo}</span>
                                </div>
                            `;  
                            }   
                            
                        }
                    } else {
                        console.log("Nenhuma interrupção cadastrada.");
                    }
                });
            } else {
                console.error("Erro na requisição:", resposta.status);
            }
        })
        .catch(function (erro) {
            console.error("Erro ao processar requisição:", erro);
        });
}

function contarInterrupcoesUsuario() {
    fetch("/dashboard/contarInterrupcoes", {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
        }
    })
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    if (resposta.length > 0) {
                        var spanNumberTotal = document.getElementById('spanNumberTotal');
                        spanNumberTotal.innerHTML = resposta[0].total;
                    } else {
                        console.log("Nenhuma interrupção cadastrada.");
                    }
                });
            } else {
                console.error("Erro na requisição:", resposta.status);
            }
        })
        .catch(function (erro) {
            console.error("Erro ao processar requisição:", erro);
        });
}

