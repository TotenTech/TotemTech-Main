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

// dados mockados
const dadosCPU = [40, 50, 60, 70, 65, 55, 45]; // utilização da CPU (%)
const dadosRAM = [60, 65, 70, 75, 80, 85, 90]; // uso de RAM (%)
const dadosDISCO = [5, 6, 7, 6, 5, 4, 3]; // tempo médio de resposta do disco (ms)
const dadosDownload = [20, 25, 30, 35, 30, 25, 20]; // utilização da rede - Download (%)
const dadosUpload = [10, 15, 20, 15, 10, 15, 20]; // utilização da rede - Upload (%)
const labelSem = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00','13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00','23:00'];

const data = {
    labels: labelSem,
    datasets: [{
        label: 'Todas as interrupções',
        data: [2, 4, 6, 3, 8, 5, 7, 2, 3, 5, 7, 3, 6, 1, 3, 2, 4, 2, 9, 10, 6, 2, 3, 1], // Valores menores que 10
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            
        ],
        borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
        ],
        borderWidth: 1
    }]
};

const ctx1 = document.getElementById('graficoBar');

const chart1 = new Chart(ctx1, {
    type: 'line',
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});




//GRAFICO PIZZA : uso de recursos
// dados mockados
const dadosDistribuicao = [12, 4, 2, 1]; // percentuais CPU, RAM, disco, rede
const labelsDistribuicao = ['CPU', 'RAM', 'Disco', 'Rede'];
const cores = ['#0000CD', '	#6495ED', '#1e90ff', '#3E6BA8'];

const ctx2 = document.getElementById('graficoPizza');

const chart2 = new Chart(ctx2, {
    type: 'doughnut',
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

document.getElementById("btn_sair").addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "/";
})