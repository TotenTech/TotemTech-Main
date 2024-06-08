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
const descricaoBom = document.getElementById('boxDescricaoBom');
const descricaoMedio = document.getElementById('boxDescricaoMedio');
const descricaoRuim = document.getElementById('boxDescricaoRuim');

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
        lineDescricao.innerHTML = `Monitoramento da Rede em tempo real em %`;
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

    trocarBoxParametro(tipo);
}

function trocarBoxParametro(tipo) {

    if (tipo == "rede") {
        boxRight.style.backgroundColor = "rgba(135, 164, 214, 1)";
        descricaoBom.innerHTML = `Acima de 10MB/s. O sistema funcionará sem problemas.`;
        descricaoMedio.innerHTML = `Entre 10MB/s e 6MB/s. O sistema funcionará sem problemas, porém, pode apresentar problemas em horário de pico.`;
        descricaoRuim.innerHTML = `De 5MB/s. Indica lentidão, travamento e instabilidade do sistema`;

    } else if (tipo == "ram") {
        boxRight.style.backgroundColor = "rgba(30, 144, 255, 1)";
        descricaoBom.innerHTML = `Menos de 85% da memória total disponível. Garante que o sistema tenha recursos suficientes para executar aplicativos sem lentidão ou travamentos.`;
        descricaoMedio.innerHTML = ` Entre 85% e 89% da memória total utilizada. Nível aceitável, mas exige monitoramento para evitar sobrecarga da memória.`;
        descricaoRuim.innerHTML = ` Mais de 89% da memória total disponível. Sobrecarga da memória pode levar a lentidão, travamentos, falhas no sistema e até mesmo perda de dados.`;

    } else if (tipo == "disco") {
        boxRight.style.backgroundColor = "rgba(100, 149, 237, 1)";
        descricaoBom.innerHTML = `Menos de 80%. Nível aceitável que garante que o disco não esteja sobrecarregado, permitindo que funcione de forma eficiente.`;
        descricaoMedio.innerHTML = `Entre 80% e 90%. Nível de alerta que exige monitoramento para evitar que a utilização do disco exceda a capacidade.`;
        descricaoRuim.innerHTML = `Acima de 90%. Utilização excessiva do disco pode levar a lentidão, travamentos e falhas no sistema.`;

    } else {
        boxRight.style.backgroundColor = "rgba(135, 206, 250, 1)";
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
    selectedComponent = "cpu"
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

            putIntoGraphContinuos()
            verifyAllContinuos()
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
            memory.push(...json);
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
            console.log("Registros rede " + allNetworkLastData);
        } else {
            console.error("Deu bolete " + error);
        }
    } catch (error) {
        console.error("Erro em buscar dados dos componentes do totem selecionado " + error);
    }

    cpu.filter(it => it.idtotem == totemSelectedId).forEach(filtered => { dadosCPU.push(filtered.valor) });
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

    document.getElementById("situacaoAtualCpu").innerHTML = `${dadosCPU[dadosCPU.length - 1]}%`;
    document.getElementById("situacaoAtualRam").innerHTML = `${dadosRAM[dadosRAM.length - 1]}%`;
    document.getElementById("situacaoAtualDisco").innerHTML = `${dadosDISCO[dadosDISCO.length - 1]}%`;
    document.getElementById("situacaoAtualRede").innerHTML = `${dadosRede[dadosRede.length - 1]}MB/s`;

    verifyAllContinuos(cpu, memory, disk, network)
    abrirGrafico(selectedComponent);
    setTimeout(putIntoGraphContinuos, 135000)
}

async function verifyAllContinuos(cpu, memory, disk, network) {
    let cpuColor = "";
    let memoryColor = "";
    let diskColor = "";
    let networkColor = "";
    cpu.forEach(it => {
        let num = parseFloat(it.valor);

        if (num < 80.0) {
            document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor = "green";
            document.getElementById(`totemBoxCircle${it.idtotem}`).style.backgroundColor = "green";
            if (it.idtotem = totemSelectedId) {
                cpuColor = "green";
            }
        } else if (num >= 80.0 && num <= 90.0) {
            document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor = "yellow";
            document.getElementById(`totemBoxCircle${it.idtotem}`).style.backgroundColor = "yellow";
            if (it.idtotem == totemSelectedId) {
                cpuColor = "yellow";
            }
            // alertaMedio(it.idtotem, it.valor, "Cpu");
        } else if (num > 90.0) {
            document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor = "red";
            document.getElementById(`totemBoxCircle${it.idtotem}`).style.backgroundColor = "red";
            if (it.idtotem == totemSelectedId) {
                cpuColor = "red";
            }
            // alertaRuim(it.idtotem, it.valor, "Cpu");
        }
    })

    memory.forEach(it => {
        let num = parseFloat(it.valor);

        if (num < 85.0) {
            document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor = "green";
            document.getElementById(`totemBoxCircle${it.idtotem}`).style.backgroundColor = "green";
            if (it.idtotem == totemSelectedId) {
                memoryColor = "green";
            }
        } else if (num >= 85.0 && num <= 89.0) {
            document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor = "yellow";
            document.getElementById(`totemBoxCircle${it.idtotem}`).style.backgroundColor = "yellow";
            if (it.idtotem == totemSelectedId) {
                memoryColor = "yellow";
            }
            // alertaMedio(it.idtotem, it.valor, "Memória");
        } else if (num > 89.0) {
            document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor = "red";
            document.getElementById(`totemBoxCircle${it.idtotem}`).style.backgroundColor = "red";
            if (it.idtotem == totemSelectedId) {
                memoryColor = "red";
            }
            // alertaRuim(it.idtotem, it.valor, "Memória");
        }
    })

    disk.forEach(it => {
        let num = parseFloat(it.valor);

        if (num < 80.0) {
            document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor = "green";
            document.getElementById(`totemBoxCircle${it.idtotem}`).style.backgroundColor = "green";
            if (it.idtotem == totemSelectedId) {
                diskColor = "green";
            }
        } else if (num >= 80.0 && num <= 90.0) {
            document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor = "yellow";
            document.getElementById(`totemBoxCircle${it.idtotem}`).style.backgroundColor = "yellow";
            if (it.idtotem == totemSelectedId) {
                diskColor = "yellow";
            }
            // alertaMedio(it.idtotem, it.valor, "Memória");
        } else if (num > 90.0) {
            document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor = "red";
            document.getElementById(`totemBoxCircle${it.idtotem}`).style.backgroundColor = "red";
            if (it.idtotem == totemSelectedId) {
                diskColor = "red";
            }
            // alertaRuim(it.idtotem, it.valor, "Memória");
        }
    })

    network.forEach(it => {
        let num = parseFloat(it.valor);

        if (num > 10.0) {
            document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor = "green";
            document.getElementById(`totemBoxCircle${it.idtotem}`).style.backgroundColor = "green";
            if (it.idtotem == totemSelectedId) {
                networkColor = "green";
            }
        } else if (num >= 6.0 && num <= 10.0) {
            document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor = "yellow";
            document.getElementById(`totemBoxCircle${it.idtotem}`).style.backgroundColor = "yellow";
            if (it.idtotem == totemSelectedId) {
                networkColor = "yellow";
            }
            // alertaMedio(it.idtotem, it.valor, "Rede");
        } else if (num < 6.0) {
            document.getElementById(`totemLineCircle${it.idtotem}`).style.backgroundColor = "red";
            document.getElementById(`totemBoxCircle${it.idtotem}`).style.backgroundColor = "red";
            if (it.idtotem == totemSelectedId) {
                networkColor = "red";
            }
            // alertaRuim(it.idtotem, it.valor, "Rede");
        }
    })

    document.getElementById("boxCpuCircle").style.backgroundColor = cpuColor;
    document.getElementById("boxDiscoCircle").style.backgroundColor = diskColor;
    document.getElementById("boxRamCircle").style.backgroundColor = memoryColor;
    document.getElementById("boxRedeCircle").style.backgroundColor = networkColor;
}