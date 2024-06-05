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

function openModal() {
    document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    const ctx1 = document.getElementById('graficoBar').getContext('2d');
    const dateInput = document.getElementById('dataBusca');
    const errorMessage = document.getElementById('errorMessage');

    function fetchAndRenderData(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (!Array.isArray(data) || data.length === 0) {
                    console.error('Dados inválidos recebidos:', data);
                    errorMessage.textContent = 'Nenhum dado encontrado.';
                    return;
                }

                const labels = Array.from({length: 24}, (_, i) => `${String(i).padStart(2, '0')}:00`);
                const values = new Array(24).fill(0);
                const motivos = new Array(24).fill('');

                data.forEach(item => {
                    const index = parseInt(item.hora.split(':')[0]);
                    values[index] = item.total;
                    motivos[index] = item.motivo;
                });

                const chartData = {
                    labels: labels,
                    datasets: [{
                        label: 'Interrupções',
                        data: values,
                        backgroundColor: 'rgba(62, 107, 168, 0.2)',
                        borderColor: '#3E6BA8',
                        borderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
                        pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
                        pointHoverBorderWidth: 2
                    }]
                };

                const chartOptions = {
                    scales: {
                        y: {
                            beginAtZero: true,
                            suggestedMax: Math.max(...values) + 1,
                            ticks: {
                                stepSize: 1,
                                callback: function(value) {
                                    return value;
                                }
                            }
                        },
                        x: {
                            ticks: {
                                callback: function(value, index, ticks) {
                                    return labels[index];
                                }
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    label += context.raw;
                                    label += ' - ' + motivos[context.dataIndex];
                                    return label;
                                }
                            }
                        }
                    }
                };

                if (chart1) {
                    chart1.destroy();
                }

                chart1 = new Chart(ctx1, {
                    type: 'line',
                    data: chartData,
                    options: chartOptions
                });
            })
            .catch(error => {
                console.error('Erro ao buscar dados: ', error);
                errorMessage.textContent = 'Erro ao buscar dados. Tente novamente mais tarde.';
            });
    }

    let chart1;
    fetchAndRenderData('/dashboard/buscarInterrupcoesUltimas24Horas');

    dateInput.addEventListener('change', function() {
        const selectedDate = dateInput.value;
        fetchAndRenderData(`/dashboard/buscarInterrupcoesPorData?data=${selectedDate}`);
    });
});

// GRAFICO PIZZA : uso de recursos
const labelsDistribuicao = ['CPU', 'Memória RAM', 'Disco', 'Rede'];
const cores = ['#0000CD', '#6495ED', '#1e90ff', '#3E6BA8'];
let chart;

function normalizeMotivo(motivo) {
    const mapping = {
        'Cpu': 'CPU',
        'Memória RAM': 'Memória RAM',
        'Disco': 'Disco',
        'Rede': 'Rede'
    };
    return mapping[motivo] || motivo;
}

function updateChart(data) {
    const dadosDistribuicao = labelsDistribuicao.map(label => {
        const item = data.find(d => normalizeMotivo(d.motivo) === label);
        return item ? item.total : 0;
    });

    const chartData = {
        labels: labelsDistribuicao,
        datasets: [{
            data: dadosDistribuicao,
            backgroundColor: cores
        }]
    };

    if (chart) {
        chart.destroy();
    }

    const ctx2 = document.getElementById('graficoPizza').getContext('2d');
    chart = new Chart(ctx2, {
        type: 'doughnut',
        data: chartData,
        options: {
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
}

function updateComponentCounts(data) {
    const componentCounts = {
        CPU: 0,
        'Memória RAM': 0,
        Disco: 0,
        Rede: 0
    };

    data.forEach(item => {
        const motivo = normalizeMotivo(item.motivo);
        if (motivo === 'CPU') componentCounts.CPU = item.total;
        if (motivo === 'Memória RAM') componentCounts['Memória RAM'] = item.total;
        if (motivo === 'Disco') componentCounts.Disco = item.total;
        if (motivo === 'Rede') componentCounts.Rede = item.total;
    });

    document.getElementById('spanTotalCpu').textContent = `Cpu: ${componentCounts.CPU}`;
    document.getElementById('spanTotalDisco').textContent = `Disco: ${componentCounts.Disco}`;
    document.getElementById('spanTotalRam').textContent = `Memória RAM: ${componentCounts['Memória RAM']}`;
    document.getElementById('spanTotalRede').textContent = `Rede: ${componentCounts.Rede}`;
}

function fetchMotivoData(totem = '') {
    const url = totem ? `/dashboard/motivoUltimos30Dias?totem=${totem}` : '/dashboard/motivoUltimos30Dias';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            updateChart(data);
            updateComponentCounts(data);
        })
        .catch(error => console.error('Erro ao buscar dados de motivo:', error));
}

function fetchTotemData() {
    fetch('/dashboard/totemUltimos30Dias')
        .then(response => response.json())
        .then(data => {
            const ul = document.querySelector('.boxOptionsTotem ul');
            ul.innerHTML = '<li data-totem="">Geral</li>'; // Resetar lista

            data.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `Totem ${item.totem}`;
                li.setAttribute('data-totem', item.totem);
                ul.appendChild(li);
            });

            document.querySelectorAll('.boxOptionsTotem ul li').forEach(li => {
                li.addEventListener('click', function() {
                    const totem = this.getAttribute('data-totem');
                    fetchMotivoData(totem);
                });
            });
        })
        .catch(error => console.error('Erro ao buscar dados de totem:', error));
}

// Inicializar dados gerais
fetchMotivoData();
fetchTotemData();

document.getElementById("btn_sair").addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "/";
});