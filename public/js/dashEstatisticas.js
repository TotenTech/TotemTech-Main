function openModal() {
    document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

// dados mockados
const dadosCPU = [40, 50, 60, 70, 65, 55, 45]; // utilização da CPU (%)
const dadosRAM = [60, 65, 70, 75, 80, 85, 90]; // uso de RAM (%)
const dadosDISCO = [5, 6, 7, 6, 5, 4, 3]; // tempo médio de resposta do disco (ms)
const dadosDownload = [20, 25, 30, 35, 30, 25, 20]; // utilização da rede - Download (%)
const dadosUpload = [10, 15, 20, 15, 10, 15, 20]; // utilização da rede - Upload (%)
const labels = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

// tentativa de converter os horários para minutos
const minutos = labels.map(label => {
    const [hora, minuto] = label.split(':');
    return (parseInt(hora) * 60) + parseInt(minuto);
});

const ctx1 = document.getElementById('graficoLinhas');

const chart1 = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: minutos,
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
            x: {
                type: 'linear',
                ticks: {
                    callback: function (value, index, values) {
                        const horas = Math.floor(value / 60);
                        const minutos = value % 60;
                        return `${horas}:${minutos < 10 ? '0' : ''}${minutos}`;
                    }
                }
            },
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


//GRAFICO PIZZA : uso de recursos
// dados mockados
const dadosDistribuicao = [30, 20, 25, 25]; // percentuais CPU, RAM, disco, rede
const labelsDistribuicao = ['CPU', 'RAM', 'Disco', 'Rede'];
const cores = ['#D6618F', '#F1931B', '#888C46', '#3E6BA8'];

const ctx2 = document.getElementById('graficoPizza');

const chart2 = new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: labelsDistribuicao,
        datasets: [{
            data: dadosDistribuicao,
            backgroundColor: cores
        }]
    },
    options: {
        plugins: {
            legend: {
                position: 'right'
            }
        }
    }
});