window.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.ID_USUARIO == undefined) {
        window.location.href = "/erro";
    }
    listAll()
});

// Definir telas disponiveis por nivel de acesso
if (sessionStorage.TIPO_USUARIO == "1") {
    const screenGerenciarUsuario = document.getElementById("screenGerenciarUsuarioLi");
    screenGerenciarUsuario.style.display = "none";
}

// Div que totem todos os graficos e linhas
const boxGrafico = document.getElementById('divBoxGrafico');

//Linha da descrição do gráfico
const lineDescricao = document.getElementById('boxLineDescricao');

// Local de plotar o gráfico
const localChart = document.getElementById('boxLocalChart');

// Div do modal com o total de totens
const totalTotem = document.getElementById('boxTotalTotem');


// Definir o nome do usuário e empresa
const nameUser = document.getElementById('spanNameUser');
const nameCompany = document.getElementById('spanNameCompany');
nameUser.innerHTML = `${sessionStorage.NOME_USUARIO}`;
nameCompany.innerHTML = `${sessionStorage.NOME_EMPRESA}`;

// Caixa das métricas
const boxRight = document.getElementById('boxRightDiv');

// Descrição das métricas
const lineButton = document.getElementById('lineButtonDiv');
const descricaoBom = document.getElementById('boxDescricaoBom');
const descricaoMedio = document.getElementById('boxDescricaoMedio');
const descricaoRuim = document.getElementById('boxDescricaoRuim');

// Mensagem de alerta
const alertMessage = document.getElementById('alertMessage');


//Mensagem interrupcoes e alertas
var messagemInterrupcoes = [];
var storedMessages = sessionStorage.getItem('HISTORY_MESSAGE');

//gráfico:
// Dados de exemplo 
let dadosCPU = []; // Utilização da CPU (%)
let dadosRAM = []; // Uso de RAM (%)
let dadosDISCO = []; // Tempo médio de resposta do disco (ms)
let dadosRede = []; // Utilização da rede - Download (%)
let dadosHorario = [];

let selectedComponent;
function abrirGrafico(tipo) {

    if (tipo == "rede") {
        selectedComponent = "rede";
        boxGrafico.style.backgroundColor = "rgba(135, 164, 214, 1)";
        lineDescricao.innerHTML = `Monitoramento da Rede em tempo real em MB/s`;
        localChart.innerHTML = `<canvas class="graficoRede" id="graficoRede"></canvas>`;
        const ctxRede = document.getElementById('graficoRede');


        const chartQuatro = new Chart(ctxRede, {
            type: 'line',
            data: {
                labels: dadosHorario,
                datasets: [{
                    label: 'Rede',
                    data: dadosRede,
                    borderColor: '#FFFFFF',
                    fill: false
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });

    } else if (tipo == "ram") {
        selectedComponent = "ram";
        boxGrafico.style.backgroundColor = "rgba(30, 144, 255, 1)";
        lineDescricao.innerHTML = `Monitoramento da memória RAM em tempo real em %`;
        localChart.innerHTML = `<canvas class="graficoRAM" id="graficoRAM"></canvas>`;
        const ctxRam = document.getElementById('graficoRAM');

        const chartDois = new Chart(ctxRam, {
            type: 'line',
            data: {
                labels: dadosHorario,
                datasets: [{
                    label: 'RAM',
                    data: dadosRAM,
                    borderColor: '#FFFFFF',
                    fill: false
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });

    } else if (tipo == "disco") {
        selectedComponent = "disco";
        boxGrafico.style.backgroundColor = "rgba(100, 149, 237, 1)";
        lineDescricao.innerHTML = `Monitoramento do Disco em tempo real em %`;
        localChart.innerHTML = `<canvas class="graficoDisco" id="graficoDisco"></canvas>`;
        const ctxDisco = document.getElementById('graficoDisco');


        const chartTres = new Chart(ctxDisco, {
            type: 'line',
            data: {
                labels: dadosHorario,
                datasets: [{
                    label: 'Disco',
                    data: dadosDISCO,
                    borderColor: '#FFFFFF',
                    fill: false
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    } else {
        selectedComponent = "cpu"
        boxGrafico.style.backgroundColor = "rgba(135, 206, 250, 1)";
        lineDescricao.innerHTML = ` Monitoramento da Cpu em tempo real em %`;
        localChart.innerHTML = `<canvas class="graficoCPU" id="graficoCPU"></canvas>`;
        const ctxCpu = document.getElementById('graficoCPU');

        const chart = new Chart(ctxCpu, {
            type: 'line',
            data: {
                labels: dadosHorario,
                datasets: [{
                    label: 'CPU',
                    data: dadosCPU,
                    borderColor: '#FFFFFF',
                    fill: false
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });

    }

    direcionarButton(selectedComponent, 'legenda');
}

function trocarBoxParametro(tipo) {
    boxRight.innerHTML = `
<div class="lineButton" id="lineButtonDiv">
    <button class="escolhido" onclick="direcionarButton('cpu', 'legenda')">Legenda</button>
    <button onclick="direcionarButton('cpu', 'alerta')">Alertas</button>
</div>

<div class="line">
    <div class="circuleGreen"></div> Bom
</div>
<span class="descricao" id="boxDescricaoBom">Menos de 79%. Indica que a CPU está trabalhando sem sobrecarga, com folga para lidar com picos de demanda.</span>


<div class="line">
    <div class="circuleYellow"></div>Médio
</div>
<span class="descricao" id="boxDescricaoMedio">Entre 80% e 90%. É sinal de que a CPU está sendo utilizada com eficiência, mas pode haver lentidão em momentos de pico.
</span>

<div class="line">
    <div class="circuleRed"></div>Ruim
</div>
<span class="descricao" id="boxDescricaoRuim">Acima de 90%. Indica sobrecarga da CPU, resultando em lentidão, travamentos e instabilidade do sistema.
</span>

`;

    const lineButton = document.getElementById('lineButtonDiv');
    const descricaoBom = document.getElementById('boxDescricaoBom');
    const descricaoMedio = document.getElementById('boxDescricaoMedio');
    const descricaoRuim = document.getElementById('boxDescricaoRuim');

    if (tipo == "rede") {
        boxRight.style.backgroundColor = "rgba(135, 164, 214, 1)";
        lineButton.innerHTML = ` <button class="escolhido" onclick="direcionarButton('rede', 'legenda')">Legenda</button>
        <button onclick="direcionarButton('rede', 'alerta')">Alertas</button>`;
        descricaoBom.innerHTML = `Acima de 10MB/s. O sistema funcionará sem problemas.`;
        descricaoMedio.innerHTML = `Entre 10MB/s e 6MB/s. O sistema funcionará sem problemas, porém, pode apresentar problemas em horário de pico.`;
        descricaoRuim.innerHTML = `De 5MB/s. Indica lentidão, travamento e instabilidade do sistema`;

    } else if (tipo == "ram") {
        boxRight.style.backgroundColor = "rgba(30, 144, 255, 1)";
        lineButton.innerHTML = ` <button class="escolhido" onclick="direcionarButton('ram', 'legenda')">Legenda</button>
        <button onclick="direcionarButton('ram', 'alerta')">Alertas</button>`;
        descricaoBom.innerHTML = `Menos de 85% da memória total disponível. Garante que o sistema tenha recursos suficientes para executar aplicativos sem lentidão ou travamentos.`;
        descricaoMedio.innerHTML = ` Entre 85% e 89% da memória total utilizada. Nível aceitável, mas exige monitoramento para evitar sobrecarga da memória.`;
        descricaoRuim.innerHTML = ` Mais de 89% da memória total disponível. Sobrecarga da memória pode levar a lentidão, travamentos, falhas no sistema e até mesmo perda de dados.`;

    } else if (tipo == "disco") {
        boxRight.style.backgroundColor = "rgba(100, 149, 237, 1)";
        lineButton.innerHTML = ` <button class="escolhido" onclick="direcionarButton('disco', 'legenda')">Legenda</button>
        <button onclick="direcionarButton('disco', 'alerta')">Alertas</button>`;
        descricaoBom.innerHTML = `Menos de 80%. Nível aceitável que garante que o disco não esteja sobrecarregado, permitindo que funcione de forma eficiente.`;
        descricaoMedio.innerHTML = `Entre 80% e 90%. Nível de alerta que exige monitoramento para evitar que a utilização do disco exceda a capacidade.`;
        descricaoRuim.innerHTML = `Acima de 90%. Utilização excessiva do disco pode levar a lentidão, travamentos e falhas no sistema.`;

    } else {
        boxRight.style.backgroundColor = "rgba(135, 206, 250, 1)";
        lineButton.innerHTML = ` <button class="escolhido" onclick="direcionarButton('cpu', 'legenda')">Legenda</button>
        <button onclick="direcionarButton('cpu', 'alerta')">Alertas</button>`;
        descricaoBom.innerHTML = `Menos de 79%. Indica que a CPU está trabalhando sem sobrecarga, com folga para lidar com picos de demanda.`;
        descricaoMedio.innerHTML = `Entre 80% e 90%. É sinal de que a CPU está sendo utilizada com eficiência, mas pode haver lentidão em momentos de pico.`;
        descricaoRuim.innerHTML = `Acima de 90%. Indica sobrecarga da CPU, resultando em lentidão, travamentos e instabilidades do sistema.`;

    }
}

//  //legenda cores - status totens
//  document.getElementById('circle-legenda').addEventListener('click', function () {
//     var helpLegenda = document.getElementById('legenda-help');
//     if (helpLegenda.style.display === 'none') {
//         helpLegenda.style.display = 'block';
//     } else {
//         helpLegenda.style.display = 'none';
//     }
// });


document.getElementById("btn_sair").addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "/";
})


function direcionarButton(tipo, button) {
    if (button == "legenda") {
        boxRight.innerHTML = `  <div class="lineButton" id="lineButtonDiv">
        <button class="escolhido" onclick="direcionarButton('${selectedComponent}', 'legenda')">Legenda</button>
        <button onclick="direcionarButton('${selectedComponent}', 'alerta')">Alertas</button>
    </div>

    <div class="line">
        <div class="circuleGreen"></div> Bom
    </div>
    <span class="descricao" id="boxDescricaoBom">Menos de 79%. Indica que a CPU está trabalhando sem sobrecarga, com folga para lidar com picos de demanda.</span>


    <div class="line">
        <div class="circuleYellow"></div>Médio
    </div>
    <span class="descricao" id="boxDescricaoMedio">Entre 80% e 90%. É sinal de que a CPU está sendo utilizada com eficiência, mas pode haver lentidão em momentos de pico.
    </span>

    <div class="line">
        <div class="circuleRed"></div>Ruim
    </div>
    <span class="descricao" id="boxDescricaoRuim">Acima de 90%. Indica sobrecarga da CPU, resultando em lentidão, travamentos e instabilidade do sistema.
    </span>
`;
        trocarBoxParametro(tipo);
    } else {
        historyAlerta(tipo);
    }
}

function historyAlerta(tipo) {
    let dataAtual = new Date();

    let ano = dataAtual.getFullYear();
    let mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    let dia = String(dataAtual.getDate()).padStart(2, '0');
    let dataFormatada = `${ano}-${mes}-${dia}`;
    var vazio = true;
    var contador = 1;


    fetch("/dashboard/selectTotemAlerta", {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            idtotemServer: sessionStorage.ID_TOTEM_ALERTA,
            dataServer: dataFormatada,
        })
    })
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    boxRight.innerHTML = `
                <div class="lineButton" id="lineButtonDiv">
                    <button onclick="direcionarButton('${selectedComponent}', 'legenda')">Legenda</button>
                    <button class="escolhido" onclick="direcionarButton('${selectedComponent}', 'alerta')">Alertas</button>
                </div>
    
                <div class="detalheMensagem">
                    <button onclick="historyAlertaTotal()">Total</button>
                    <button class="escolhido" onclick="historyAlerta('${selectedComponent}')">Totem Atual</button>
                </div>
                
                    <span class="legendaInterrupcoes">Mensagem do Dia</span>`;
                    if (resposta.length > 0) {
                        for (var c = 0; c < resposta.length; c++) {
                            var interrupcao = resposta[c];
                            let data = new Date(interrupcao.horario);
                            let hora = ("0" + data.getUTCHours()).slice(-2);
                            let minutos = ("0" + data.getUTCMinutes()).slice(-2);

                            let horaFormatada = hora + ":" + minutos;

                            boxRight.innerHTML += `<div class="boxInterrupcoes">
                        <div class="line">
                            <div class="boxAtualInterrupcoesCircle" id="boxAtualInterrupcoesCircleDiv${c}"></div>
                            ${interrupcao.nome} - ${horaFormatada}</div>   
                        <span class="texto">O totem reiniciou por conta do componente ${interrupcao.motivo}.</span>
                        <div>
                        </div>
                    </div>`;
                            const boxAtualInterrupcoesCircle = document.getElementById("boxAtualInterrupcoesCircleDiv" + `${c}`);
                            boxAtualInterrupcoesCircle.style.backgroundColor = 'red';
                            contador++;
                        }
                    }
                    plotarMessage(true, sessionStorage.ID_TOTEM_ALERTA)

                });
            } else {
                console.error("Erro na requisição:", resposta.status);
            }
        })
        .catch(function (erro) {
            console.error("Erro ao processar requisição:", erro);
            boxRight.innerHTML = `Erro na requisição`;
        });


    const historyMessageArray = JSON.parse(sessionStorage.getItem('HISTORY_MESSAGE')) || [];
}

function historyAlertaTotal() {
    let dataAtual = new Date();

    let ano = dataAtual.getFullYear();
    let mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    let dia = String(dataAtual.getDate()).padStart(2, '0');
    let dataFormatada = `${ano}-${mes}-${dia}`;


    fetch("/dashboard/selectTotemAlertaTotal", {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            empresaServer: sessionStorage.EMPRESA_USUARIO,
            dataServer: dataFormatada,
        })
    })
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    boxRight.innerHTML = `
                <div class="lineButton" id="lineButtonDiv">
                    <button onclick="direcionarButton('${selectedComponent}', 'legenda')">Legenda</button>
                    <button class="escolhido" onclick="direcionarButton('${selectedComponent}', 'alerta')">Alertas</button>
                </div>
    
                <div class="detalheMensagem">
                    <button class="escolhido" onclick="historyAlertaTotal()">Total</button>
                    <button onclick="historyAlerta('${selectedComponent}')">Totem Atual</button>
                </div>
                
                    <span class="legendaInterrupcoes">Mensagem do Dia</span>`;
                    if (resposta.length > 0) {
                        for (var c = 0; c < resposta.length; c++) {
                            var interrupcao = resposta[c];
                            let data = new Date(interrupcao.horario);
                            let hora = ("0" + data.getUTCHours()).slice(-2);
                            let minutos = ("0" + data.getUTCMinutes()).slice(-2);

                            let horaFormatada = hora + ":" + minutos;

                            boxRight.innerHTML += `<div class="boxInterrupcoes">
                        <div class="line">
                            <div class="boxAtualInterrupcoesCircle" id="boxAtualInterrupcoesCircleDiv${c}"></div>
                            ${interrupcao.nome} - ${horaFormatada}</div>   
                        <span class="texto">O totem reiniciou por conta do componente ${interrupcao.motivo}.</span>
                        <div>
                        </div>
                    </div>`;

                            const boxAtualInterrupcoesCircle = document.getElementById("boxAtualInterrupcoesCircleDiv" + `${c}`);
                            boxAtualInterrupcoesCircle.style.backgroundColor = `red`;
                        }
                    }
                    plotarMessage(false)
                });
            } else {
                console.error("Erro na requisição:", resposta.status);
            }
        })
        .catch(function (erro) {
            console.error("Erro ao processar requisição:", erro);
            boxRight.innerHTML = `Erro na requisição`;
        });


}

function plotarMessage(vazio, idtotem) {
    let contador = 1;
    const historyMessageArray = JSON.parse(sessionStorage.getItem('HISTORY_MESSAGE')) || [];
    if (vazio) {
        historyMessageArray.forEach((objeto, indice) => {
            if (objeto.idtotem === parseInt(idtotem, 10)) {
                boxRight.innerHTML += `
            <div class="boxInterrupcoes">
              <div class="line">
                <div class="boxAtualInterrupcoesCircle" id="boxAtualInterrupcoesCircleDiv${contador}I"></div>
                ${objeto.nomeTotem} - ${objeto.horario} 
              </div>   
              <span class="texto">O totem entrou no status ${objeto.cor} por conta do componente ${objeto.tipo}.</span>
              <span class="texto">Valor: ${objeto.valor}</span>
            </div>
          `;
                const boxAtualInterrupcoesCircle = document.getElementById("boxAtualInterrupcoesCircleDiv" + contador + "I");
                if (objeto.cor == "Amarelo") {
                    boxAtualInterrupcoesCircle.style.backgroundColor = `yellow`;
                } else {
                    boxAtualInterrupcoesCircle.style.backgroundColor = `red`;
                }
                contador++;
            }
        });
    } else {
        historyMessageArray.forEach((objeto, indice) => {
            boxRight.innerHTML += `
            <div class="boxInterrupcoes">
              <div class="line">
                <div class="boxAtualInterrupcoesCircle" id="boxAtualInterrupcoesCircleDiv${contador}I"></div>
                ${objeto.nomeTotem} - ${objeto.horario} 
              </div>   
              <span class="texto">O totem entrou no status ${objeto.cor} por conta do componente ${objeto.tipo}.</span>
              <span class="texto">Valor: ${objeto.valor}</span>
            </div>
          `;
            const boxAtualInterrupcoesCircle = document.getElementById("boxAtualInterrupcoesCircleDiv" + contador + "I");
            if (objeto.cor == "Amarelo") {
                boxAtualInterrupcoesCircle.style.backgroundColor = `yellow`;
            } else {
                boxAtualInterrupcoesCircle.style.backgroundColor = `red`;
            }
            contador++;
        });
    }
}

function newInfoMessage(cor, tipo, horarioAtual, idtotem, valor) {
    let colorMessage = "";

    if (cor == "yellow") {
        colorMessage = 'Amarelo';
    } else {
        colorMessage = 'Vermelho';
    }


    let message = {
        idtotem: idtotem,
        nomeTotem: allTotens[idtotem - 1].nome,
        cor: colorMessage,
        tipo: tipo,
        horario: horarioAtual,
        valor: valor
    };

    messagemInterrupcoes = JSON.parse(sessionStorage.getItem('HISTORY_MESSAGE')) || [];

    if (messagemInterrupcoes.length == 0) {
        messagemInterrupcoes.push(message);
    } else {
        var dadoRepetido = false;
        for (var c = 0; c < messagemInterrupcoes.length; c++) {
            if ((messagemInterrupcoes[c].valor == message.valor &&
                messagemInterrupcoes[c].idtotem == message.idtotem) || (messagemInterrupcoes[c].valor == message.valor &&
                    messagemInterrupcoes[c].idtotem == message.idtotem && messagemInterrupcoes[c].horario == message.horario)) {
                dadoRepetido = true;
            }
        }
        if(dadoRepetido == false){
            messagemInterrupcoes.push(message);
        }

    }
    sessionStorage.setItem('HISTORY_MESSAGE', JSON.stringify(messagemInterrupcoes));

    alertMessage.innerHTML = `
    <div class="boxInterrupcoes">
        <div class="line">
            <div class="boxAtualInterrupcoesCircle" id="boxAtualInterrupcoesCircleDiv"></div>
                ${message.nomeTotem} - ${message.horario}  
            </div>   
                <span class="texto">O totem entrou no status ${colorMessage} por conta do componente ${message.tipo}.</span>
               <br>
                <span class="texto">Valor: ${message.valor}</span>
            <div>
        </div>
     </div>`;

    mostrarAlerta();
    const circleStatus = document.getElementById('boxAtualInterrupcoesCircleDiv');
    circleStatus.style.backgroundColor = `${cor}`;
    if (storedMessages) {
        try {
            messagemInterrupcoes = JSON.parse(storedMessages);
        } catch (e) {
            messagemInterrupcoes = [];
        }
    }
    historyAlerta(tipo);
    setTimeout(function () {
        esconderAlerta();
    }, 6000);
}

function mostrarAlerta() {
    alertMessage.style.right = '2%';
    alertMessage.style.opacity = '1';
}

function esconderAlerta() {
    alertMessage.style.right = '-100%';
    alertMessage.style.opacity = '0';
}

let totemSelectedId;
const selectedTotemTitle = document.getElementById("h1TituloTotem");
function setTotemVisualized(idTotem, empresa, nome) {
    dadosCPU = [];
    dadosRAM = [];
    dadosDISCO = [];
    dadosRede = [];
    dadosHorario = [];
    selectedTotemTitle.innerHTML = `${nome}`;
    totemSelectedId = idTotem;
    selectedComponent = "cpu";
    sessionStorage.ID_TOTEM_ALERTA = idTotem;
    sessionStorage.NOME_TOTEM_ALERTA = nome;
    abrirGrafico(selectedComponent);

    for (let i = 0; i < allTotens.length; i++) {
        if (allTotens[i].idtotem == idTotem) {
            allCpuLastData.filter(it => it.idtotem === idTotem).forEach(filtered => { dadosCPU.push(filtered.valor) });
            document.getElementById("situacaoAtualCpu").innerHTML = `${dadosCPU[dadosCPU.length - 1]}%`;
            allMemoryLastData.filter(it => it.idtotem === idTotem).forEach(filtered => { dadosRAM.push(filtered.valor) });
            document.getElementById("situacaoAtualRam").innerHTML = `${dadosRAM[dadosRAM.length - 1]}%`;
            allDiskLastData.filter(it => it.idtotem === idTotem).forEach(filtered => { dadosDISCO.push(filtered.valor) });
            document.getElementById("situacaoAtualDisco").innerHTML = `${dadosDISCO[dadosDISCO.length - 1]}%`;
            allNetworkLastData.filter(it => it.idtotem === idTotem).forEach(filtered => { dadosRede.push(filtered.valor) });
            document.getElementById("situacaoAtualRede").innerHTML = `${dadosRede[dadosRede.length - 1]}MB/s`;

            putIntoGraphContinuos();
        }
    }
}

const allTotens = [];
const listTotalTotem = document.getElementById('totalTotensList');
const listTotensFirstScreen = document.getElementById("lineTotens");
function listTotensFirstScreenAdd() {
    allTotens.forEach((i) => {
        listTotensFirstScreen.innerHTML +=
            `<div class="totemAmarelo" id="lineBoxTotem${i.idtotem}" onclick="setTotemVisualized(${i.idtotem}, ${i.empresa}, '${i.nome}')">
            <div class="circle" id="totemLineCircle${i.idtotem}"></div>
                <img src="../../img/smartphone.png">
                <span id="spanNameTotem">${i.nome}</span>
            </div>`;
    })

    allTotens.forEach((i) => {
        listTotalTotem.innerHTML +=
            `<div class="totemAmarelo" id="totalBoxTotem${i.idtotem}" onclick="setTotemVisualized('${i.idtotem}', '${i.empresa}', '${i.nome}')">
            <div class="circle" id="totemBoxCircle${i.idtotem}"></div>
                <img src="../../img/smartphone.png">
                <span id="spanNameTotem">${i.nome}</span>
            </div>`;
    })
}

function totalTotemFunction(decisao) {
    if (decisao == "abrir") {
        totalTotem.style.display = "flex";
    } else {
        totalTotem.style.display = "none";
    }
}

async function listAll() {
    try {
        const response = await fetch(`/totens/listAll/${sessionStorage.EMPRESA_USUARIO}`);
        if (response.ok) {
            const json = await response.json();
            console.log(JSON.stringify(json));
            allTotens.push(...json);
            listTotensFirstScreenAdd();
            getLastComponentsData();
            console.log("totens na lista = " + allTotens);
        } else {
            console.error("Deu bolete");
        }
    } catch (error) {
        console.error("Erro em buscar totens no banco", error);
    }
}

let allCpuLastData = [];
let allMemoryLastData = [];
let allDiskLastData = [];
let allNetworkLastData = [];
async function getLastComponentsData() {
    if (allCpuLastData.length > 0) {
        allCpuLastData = [];
    }
    if (allMemoryLastData.length > 0) {
        allMemoryLastData = [];
    }
    if (allDiskLastData.length > 0) {
        allDiskLastData = [];
    }
    if (allNetworkLastData.length > 0) {
        allNetworkLastData = [];
    }
    if (counter == 0) {
        dadosCPU = [];
        dadosDISCO = [];
        dadosHorario = [];
        dadosRAM = [];
        dadosRede = [];
    }
    try {
        //CPU
        const response = await fetch(`/totens/getComponentLastData/${sessionStorage.EMPRESA_USUARIO}/1`);
        if (response.ok) {
            const json = await response.json();
            console.log(JSON.stringify(json));
            allCpuLastData.push(...json);
            console.log("Registros Cpu " + allCpuLastData);
        } else {
            console.error("Deu bolete " + error);
        }
    } catch (error) {
        console.error("Erro em buscar dados dos componentes do totem selecionado " + error);
    }

    try {
        //Memoria
        const response = await fetch(`/totens/getComponentLastData/${sessionStorage.EMPRESA_USUARIO}/${2}`);
        if (response.ok) {
            const json = await response.json();
            console.log(JSON.stringify(json));
            allMemoryLastData.push(...json);
            console.log("Registros memoria " + allMemoryLastData);
        } else {
            console.error("Deu bolete " + error);
        }
    } catch (error) {
        console.error("Erro em buscar dados dos componentes do totem selecionado " + error);
    }

    try {
        //Discos
        const response = await fetch(`/totens/getComponentLastData/${sessionStorage.EMPRESA_USUARIO}/${5}`);
        if (response.ok) {
            const json = await response.json();
            console.log(JSON.stringify(json));
            allDiskLastData.push(...json);
            console.log("Registros disco " + allDiskLastData);
        } else {
            console.error("Deu bolete " + error);
        }
    } catch (error) {
        console.error("Erro em buscar dados dos componentes do totem selecionado " + error);
    }

    try {
        //Rede
        const response = await fetch(`/totens/getComponentLastData/${sessionStorage.EMPRESA_USUARIO}/${4}`);
        if (response.ok) {
            const json = await response.json();
            console.log(JSON.stringify(json));
            allNetworkLastData.push(...json);
            console.log("Registros rede " + allNetworkLastData);
        } else {
            console.error("Deu bolete " + error);
        }
    } catch (error) {
        console.error("Erro em buscar dados dos componentes do totem selecionado " + error);
    }

    document.getElementById(`lineBoxTotem${allTotens[0].idtotem}`).click();
    abrirGrafico("cpu");
}

let counter = 0;
async function putIntoGraphContinuos() {
    let cpu = [];
    let memory = [];
    let disk = [];
    let network = [];
    if (dadosCPU.length >= 10) {
        dadosCPU.shift();
    }
    if (dadosDISCO.length >= 10) {
        dadosDISCO.shift();
    }
    if (dadosRAM.length >= 10) {
        dadosRAM.shift();
    }
    if (dadosRede.length >= 10) {
        dadosRede.shift();
    }
    if (dadosHorario.length >= 10) {
        dadosHorario.shift();
    }
    try {
        //CPU
        const response = await fetch(`/totens/getComponentLastData/${sessionStorage.EMPRESA_USUARIO}/1`);
        if (response.ok) {
            const json = await response.json();
            console.log(JSON.stringify(json));
            cpu.push(...json);
            console.log("Registros Cpu " + cpu);
        } else {
            console.error("Deu bolete " + error);
        }
    } catch (error) {
        console.error("Erro em buscar dados dos componentes do totem selecionado " + error);
    }

    try {
        //Memoria
        const response = await fetch(`/totens/getComponentLastData/${sessionStorage.EMPRESA_USUARIO}/${2}`);
        if (response.ok) {
            const json = await response.json();
            console.log(JSON.stringify(json));
            memory.push(...json);
            console.log("Registros memoria " + memory);
        } else {
            console.error("Deu bolete " + error);
        }
    } catch (error) {
        console.error("Erro em buscar dados dos componentes do totem selecionado " + error);
    }

    try {
        //Discos
        const response = await fetch(`/totens/getComponentLastData/${sessionStorage.EMPRESA_USUARIO}/${5}`);
        if (response.ok) {
            const json = await response.json();
            disk.push(...json);
            console.log(JSON.stringify(json));
        } else {
            console.error("Deu bolete " + error);
        }
    } catch (error) {
        console.error("Erro em buscar dados dos componentes do totem selecionado " + error);
    }

    try {
        //Rede
        const response = await fetch(`/totens/getComponentLastData/${sessionStorage.EMPRESA_USUARIO}/${4}`);
        if (response.ok) {
            const json = await response.json();
            console.log(JSON.stringify(json));
            network.push(...json);
            console.log("Registros rede " + network);
        } else {
            console.error("Deu bolete " + error);
        }
    } catch (error) {
        console.error("Erro em buscar dados dos componentes do totem selecionado " + error);
    }

    cpu.filter(it => it.idtotem == totemSelectedId).forEach(filtered => { dadosCPU.push(filtered.valor) });
    console.log("Esses foram os dados filtrados " + cpu.filter(it => it.idtotem == totemSelectedId).map(at => at.valor));
    memory.filter(it => it.idtotem == totemSelectedId).forEach(filtered => { dadosRAM.push(filtered.valor) });
    disk.filter(it => it.idtotem == totemSelectedId).forEach(filtered => { dadosDISCO.push(filtered.valor) });
    network.filter(it => it.idtotem == totemSelectedId).forEach(filtered => { dadosRede.push(filtered.valor) });
    network.filter(it => it.idtotem == totemSelectedId).forEach(filtered => {
        const horario = filtered.horario;
        const regex = /T(\d{2}):(\d{2})/;
        const match = horario.match(regex);

        if (match) {
            const horas = match[1];
            const minutos = match[2];
            const horarioFormatado = `${horas}:${minutos}`;
            dadosHorario.push(horarioFormatado)
        } else {
            console.log("Horário não encontrado na string.");
        }
    });

    if (dadosCPU.length > dadosHorario.length) {
        dadosCPU.shift();
        dadosDISCO.shift();
        dadosRAM.shift();
        dadosRede.shift();
    }

    document.getElementById("situacaoAtualCpu").innerHTML = `${dadosCPU[dadosCPU.length - 1]}%`;
    document.getElementById("situacaoAtualRam").innerHTML = `${dadosRAM[dadosRAM.length - 1]}%`;
    document.getElementById("situacaoAtualDisco").innerHTML = `${dadosDISCO[dadosDISCO.length - 1]}%`;
    document.getElementById("situacaoAtualRede").innerHTML = `${dadosRede[dadosRede.length - 1]}MB/s`;

    verifyAllContinuos(cpu, memory, disk, network);
    abrirGrafico(selectedComponent);
    if (counter == 0) {
        setInterval(putIntoGraphContinuos, 127000);
        counter++;
    }
}

async function verifyAllContinuos(cpu, memory, disk, network) {
    let cpuColor = "";
    let memoryColor = "";
    let diskColor = "";
    let networkColor = "";

    //Pegar horario
    let dataAtual = new Date();

    let horaAtual = ("0" + dataAtual.getHours()).slice(-2);
    let minutosAtuais = ("0" + dataAtual.getMinutes()).slice(-2);
    let horarioAtual = horaAtual + ":" + minutosAtuais;

    cpu.forEach(it => {
        let num = parseFloat(it.valor);

        if (num < 80.0) {
            if (document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor != "yellow" && document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor != "red") {
                document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor = "green";
                document.getElementById(`totemBoxCircle${it.idtotem}`).style.backgroundColor = "green";
            }
            if (it.idtotem == totemSelectedId) {
                cpuColor = "green";

            }
        } else if (num >= 80.0 && num <= 90.0) {
            if (document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor != "red") {
                document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor = "yellow";
                document.getElementById(`totemBoxCircle${it.idtotem}`).style.backgroundColor = "yellow";
            }
            if (it.idtotem == totemSelectedId) {
                cpuColor = "yellow";
            }
            newInfoMessage('yellow', 'cpu', horarioAtual, it.idtotem, it.valor);
            // alertaMedio(it.idtotem, it.valor, "Cpu");
        } else if (num > 90.0) {
            document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor = "red";
            document.getElementById(`totemBoxCircle${it.idtotem}`).style.backgroundColor = "red";
            if (it.idtotem == totemSelectedId) {
                cpuColor = "red";
            }
            newInfoMessage('red', 'cpu', horarioAtual, it.idtotem, it.valor);
            // alertaRuim(it.idtotem, it.valor, "Cpu");
        }
    })

    memory.forEach(it => {
        let num = parseFloat(it.valor);

        if (num < 85.0) {
            if (document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor != "yellow" && document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor != "red") {
                document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor = "green";
                document.getElementById(`totemBoxCircle${it.idtotem}`).style.backgroundColor = "green";
            }
            if (it.idtotem == totemSelectedId) {
                memoryColor = "green";

            }
        } else if (num >= 85.0 && num <= 89.0) {
            if (document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor != "red") {
                document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor = "yellow";
                document.getElementById(`totemBoxCircle${it.idtotem}`).style.backgroundColor = "yellow";
            }
            if (it.idtotem == totemSelectedId) {
                memoryColor = "yellow";
            }
            newInfoMessage('yellow', 'ram', horarioAtual, it.idtotem, it.valor);
            // alertaMedio(it.idtotem, it.valor, "Memória");
        } else if (num > 89.0) {
            document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor = "red";
            document.getElementById(`totemBoxCircle${it.idtotem}`).style.backgroundColor = "red";
            if (it.idtotem == totemSelectedId) {
                memoryColor = "red";
            }
            newInfoMessage('red', 'ram', horarioAtual, it.idtotem, it.valor);
            // alertaRuim(it.idtotem, it.valor, "Memória");
        }
    })

    disk.forEach(it => {
        let num = parseFloat(it.valor);

        if (num < 80.0) {
            if (document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor != "yellow" && document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor != "red") {
                document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor = "green";
                document.getElementById(`totemBoxCircle${it.idtotem}`).style.backgroundColor = "green";
            }
            if (it.idtotem == totemSelectedId) {
                diskColor = "green";

            }
        } else if (num >= 80.0 && num <= 90.0) {
            if (document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor != "red") {
                document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor = "yellow";
                document.getElementById(`totemBoxCircle${it.idtotem}`).style.backgroundColor = "yellow";
            }
            if (it.idtotem == totemSelectedId) {
                diskColor = "yellow";
            }
            newInfoMessage('yellow', 'disco', horarioAtual, it.idtotem, it.valor);
            // alertaMedio(it.idtotem, it.valor, "Memória");
        } else if (num > 90.0) {
            document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor = "red";
            document.getElementById(`totemBoxCircle${it.idtotem}`).style.backgroundColor = "red";
            if (it.idtotem == totemSelectedId) {
                diskColor = "red";
            }
            newInfoMessage('red', 'disco', horarioAtual, it.idtotem, it.valor);
            // alertaRuim(it.idtotem, it.valor, "Memória");
        }
    })

    network.forEach(it => {
        let num = parseFloat(it.valor);

        if (num > 10.0) {
            if (document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor != "yellow" && document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor != "red") {
                document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor = "green";
                document.getElementById(`totemBoxCircle${it.idtotem}`).style.backgroundColor = "green";
            }
            if (it.idtotem == totemSelectedId) {
                networkColor = "green";

            }
        } else if (num >= 6.0 && num <= 10.0) {
            if (document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor != "red") {
                document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor = "yellow";
                document.getElementById(`totemBoxCircle${it.idtotem}`).style.backgroundColor = "yellow";
            }
            if (it.idtotem == totemSelectedId) {
                networkColor = "yellow";
            }
            newInfoMessage('yellow', 'rede', horarioAtual, it.idtotem, it.valor);
            // alertaMedio(it.idtotem, it.valor, "Rede");
        } else if (num < 6.0) {
            document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor = "red";
            document.getElementById(`totemBoxCircle${it.idtotem}`).style.backgroundColor = "red";
            if (it.idtotem == totemSelectedId) {
                networkColor = "red";
            }
            newInfoMessage('red', 'rede', horarioAtual, it.idtotem, it.valor);
            // alertaRuim(it.idtotem, it.valor, "Rede");
        }
    })

    document.getElementById("boxCpuCircle").style.backgroundColor = cpuColor;
    document.getElementById("boxDiscoCircle").style.backgroundColor = diskColor;
    document.getElementById("boxRamCircle").style.backgroundColor = memoryColor;
    document.getElementById("boxRedeCircle").style.backgroundColor = networkColor;
}