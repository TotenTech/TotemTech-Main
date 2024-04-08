window.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.ID_USUARIO == undefined) {
        window.location.href = "/erro";
    }
})
 
 //legenda cores - status totens
 document.getElementById('circle-legenda').addEventListener('click', function () {
    var helpLegenda = document.getElementById('legenda-help');
    if (helpLegenda.style.display === 'none') {
        helpLegenda.style.display = 'block';
    } else {
        helpLegenda.style.display = 'none';
    }
});


//gráfico:
// Dados de exemplo 
const dadosCPU = [40, 50, 60, 70, 65, 55, 45]; // Utilização da CPU (%)
const dadosRAM = [60, 65, 70, 75, 80, 85, 90]; // Uso de RAM (%)
const dadosDISCO = [5, 6, 7, 6, 5, 4, 3]; // Tempo médio de resposta do disco (ms)
const dadosDownload = [20, 25, 30, 35, 30, 25, 20]; // Utilização da rede - Download (%)
const dadosUpload = [10, 15, 20, 15, 10, 15, 20]; // Utilização da rede - Upload (%)
const labels = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

const ctx = document.getElementById('graficoTotem');

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'CPU',
            data: dadosCPU,
            borderColor: '#D6618F',
            fill: false
        }, {
            label: 'RAM',
            data: dadosRAM,
            borderColor: '#F1931B',
            fill: false
        }, {
            label: 'Disco',
            data: dadosDISCO,
            borderColor: '#888C46',
            fill: false
        }, {
            label: 'Download',
            data: dadosDownload,
            borderColor: '#3E6BA8',
            fill: false
        }, {
            label: 'Upload',
            data: dadosUpload,
            borderColor: '#BD4E46',
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

document.getElementById("btn_sair").addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "/";
})