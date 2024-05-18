window.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.ID_USUARIO == undefined) {
        window.location.href = "/erro";
    }
});

// Div que totem todos os graficos e linhas
const boxGrafico = document.getElementById('divBoxGrafico');

//Linha da descrição do gráfico
const lineDescricao = document.getElementById('boxLineDescricao');

// Local de plotar o gráfico
const localChart = document.getElementById('boxLocalChart');

// Div do modal com o total de totens
const totalTotem = document.getElementById('boxTotalTotem');

// Div utilizada para listar o total de totens
const listTotalTotem = document.getElementById('boxListTotalTotem');


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
const dadosCPU = [48, 49, 50, 56, 57, 58, 59, 60, 51, 52, 53, 42, 43, 44, 45, 40, 41, 54, 55, 46, 47]; // Utilização da CPU (%)
const dadosRAM = [60, 65, 68, 70, 63, 67, 69, 64, 62, 90, 66, 61, 91, 71, 89, 88, 87, 86, 85, 84, 83]; // Uso de RAM (%)
const dadosDISCO = [5, 6, 7, 6, 5, 4, 3, 3, 4, 6, 5, 7, 3, 4, 6, 5, 7]; // Tempo médio de resposta do disco (ms)
const dadosRede = [20, 25, 30, 35, 30, 25, 20, 15, 20, 15, 10, 15, 20, 15, 20, 15, 10, 15, 20]; // Utilização da rede - Download (%)


const labels = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];


function totalTotemFunction(decisao) {
    if (decisao == "abrir") {
        totalTotem.style.display = "flex";
    } else {
        totalTotem.style.display = "none";
    }
}

abrirGrafico();
function abrirGrafico(tipo) {

    if (tipo == "rede") {
        boxGrafico.style.backgroundColor = "rgba(131, 74, 161, 0.5)";
        lineDescricao.innerHTML = `Monitoramento da Rede nas últimas 24 horas em %`;
        localChart.innerHTML = `<canvas class="graficoRede" id="graficoRede"></canvas>`;
        const ctxRede = document.getElementById('graficoRede');


        const chartQuatro = new Chart(ctxRede, {
            type: 'line',
            data: {
                labels: labels,
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
        boxGrafico.style.backgroundColor = "rgba(245, 199, 126, 1)";
        lineDescricao.innerHTML = `Monitoramento da memória RAM nas últimas 24 horas em %`;
        localChart.innerHTML = `<canvas class="graficoRAM" id="graficoRAM"></canvas>`;
        const ctxRam = document.getElementById('graficoRAM');

        const chartDois = new Chart(ctxRam, {
            type: 'line',
            data: {
                labels: labels,
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
        boxGrafico.style.backgroundColor = "rgba(117, 199, 126, 1)";
        lineDescricao.innerHTML = `Monitoramento do Disco nas últimas 24 horas em %`;
        localChart.innerHTML = `<canvas class="graficoDisco" id="graficoDisco"></canvas>`;
        const ctxDisco = document.getElementById('graficoDisco');


        const chartTres = new Chart(ctxDisco, {
            type: 'line',
            data: {
                labels: labels,
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
        boxGrafico.style.backgroundColor = "rgba(136, 187, 204, 0.8)";
        lineDescricao.innerHTML = ` Monitoramento da Cpu nas últimas 24 horas em %`;
        localChart.innerHTML = `<canvas class="graficoCPU" id="graficoCPU"></canvas>`;
        const ctxCpu = document.getElementById('graficoCPU');

        const chart = new Chart(ctxCpu, {
            type: 'line',
            data: {
                labels: labels,
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

function trocarBoxParametro(tipo){

    if(tipo == "rede"){
        boxRight.style.backgroundColor = "rgba(131, 74, 161, 0.5)";
        descricaoBom.innerHTML = `Acima de 10MB/s. O sistema funcionará sem problemas.`;
        descricaoMedio.innerHTML = `Entre 10MB/s e 6MB/s. O sistema funcionará sem problemas, porém, pode apresentar problemas em horário de pico.`;
        descricaoRuim.innerHTML = `De 5MB/s. Indica lentidão, travamento e instabilidade do sistema`;

    }else if(tipo == "ram"){
        boxRight.style.backgroundColor = "rgba(245, 199, 126, 1)";
        descricaoBom.innerHTML = `Menos de 85% da memória total disponível. Garante que o sistema tenha recursos suficientes para executar aplicativos sem lentidão ou travamentos.`;
        descricaoMedio.innerHTML = ` Entre 85% e 89% da memória total utilizada. Nível aceitável, mas exige monitoramento para evitar sobrecarga da memória.`;
        descricaoRuim.innerHTML = ` Mais de 89% da memória total disponível. Sobrecarga da memória pode levar a lentidão, travamentos, falhas no sistema e até mesmo perda de dados.`;

    }else if(tipo == "disco"){
        boxRight.style.backgroundColor = "rgba(117, 199, 126, 1)";
        descricaoBom.innerHTML = `Menos de 80%. Nível aceitável que garante que o disco não esteja sobrecarregado, permitindo que funcione de forma eficiente.`;
        descricaoMedio.innerHTML = `Entre 80% e 90%. Nível de alerta que exige monitoramento para evitar que a utilização do disco exceda a capacidade.`;
        descricaoRuim.innerHTML = `Acima de 90%. Utilização excessiva do disco pode levar a lentidão, travamentos e falhas no sistema.`;
        
    }else{
        boxRight.style.backgroundColor = "rgba(136, 187, 204, 1)";
        descricaoBom.innerHTML = `Entre 50% e 79%. Indica que a CPU está trabalhando sem sobrecarga, com folga para lidar com picos de demanda.`;
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