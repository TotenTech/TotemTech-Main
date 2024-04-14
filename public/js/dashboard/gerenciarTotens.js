window.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.ID_USUARIO == undefined) {
        window.location.href = "/erro";
    }
})


/*TODAS AS CONST COM AS TELAS*/
//Vericar se é gerente
const imgNivel1 = document.querySelectorAll(".imagemNivel1");
const imgNivel2 = document.querySelectorAll('.imagemNivel2');

// Pegar todos as checkbox para verificar se ela esta selecionada ou não
const checkboxeDaVez = document.querySelectorAll('input[type="checkbox"]');

// Transição de troca de formularios
const listaTotem = document.getElementById("listaTotemDiv");
const telaAdicionar = document.getElementById("telaAdicionarDiv");
const telaEditar = document.getElementById("telaEditarDiv");
const telaInfo = document.getElementById("telaInfoDiv");


//Pegar o id das linhas que contém o texto e span
const editarTotemNome = document.getElementById("linhaEditarTotemNome");
const editarTotemEmail = document.getElementById("linhaEditarTotemEmail");
const editarTotemSenha = document.getElementById("linhaEditarTotemSenha");

// Mensagem de alerta
const mensagemAlerta = document.getElementById('mensagemAlerta');

if (sessionStorage.NIVELACESSO_USUARIO == 1) {
    imgNivel2.forEach(lixeira => {
        lixeira.style.display = "none";
    })
    imgNivel1.forEach(informacao =>{
        informacao.style.display = "block";
    })
} else {
    imgNivel1.forEach(informacao =>{
        informacao.style.display = "none";
    })
    imgNivel2.forEach(lixeira => {
        lixeira.style.display = "block";
    })
}


/*VARIAVEIS GLOBAIS */
//Usadas para armanezar o valor do texto que conte as informações do totem
var nomeTotem = "";
var emailTotem = "";
var senhaTotem = "";

//Variáveis com os novos dados de um totem já existente
var novoNomeAtual = "";
var novoEmailAtual = "";
var novoSenhaAtual = "";



// Se ela tiver ele adiciona ".checked" na class das checked fazendo com que ele troque de class
checkboxeDaVez.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            this.nextElementSibling.classList.add('checked');
        } else {
            this.nextElementSibling.classList.remove('checked');
        }
    });
});



// Primeiro ele diminui o tamanho da div
function abrirAddTotem() {
    listaTotem.style.display = "none";
    telaAdicionar.style.display = "flex";
    telaEditar.style.display = "none";
    telaInfo.style.display = "none";
}


function abrirGerenTotem() {
    telaAdicionar.style.display = "none";
    listaTotem.style.display = "flex";
    telaEditar.style.display = "none";
    telaInfo.style.display = "none";
}



// Abrir tela de editar totem
function abrirEditarTotem() {
    listaTotem.style.display = "none";
    telaEditar.style.display = "flex";
    telaAdicionar.style.display = "none";
    telaInfo.style.display = "none";
}

//Fechar tela de editar totem
function fecharEditarTotem() {
    telaEditar.style.display = "none";
    listaTotem.style.display = "flex";
    telaAdicionar.style.display = "none";
    telaInfo.style.display = "none";
    esconderInput();
}

// Abrir tela de informações do totem para usuário comum
function abrirInformacao(){
    telaEditar.style.display = "none";
    listaTotem.style.display = "none";
    telaAdicionar.style.display = "none";
    telaInfo.style.display = "flex";
}

//Fechar tela de informações do totem para usuário comum
function fecharInformacao(){
    telaEditar.style.display = "none";
    listaTotem.style.display = "flex";
    telaAdicionar.style.display = "none";
    telaInfo.style.display = "none"; 
}




//Troca as informações por input
function editarValores() {

    // Pegar o valor que esta na input, aqui eu pego as informações do totem
    nomeTotem = document.getElementById("nomeTotemSpan").innerText;
    emailTotem = document.getElementById("emailTotemSpan").innerText;
    senhaTotem = document.getElementById("senhaTotemSpan").innerText;

    //Substituir os valores do de cada p 
    editarTotemNome.innerHTML = `Nome: <input type="text" id="inputNovoEditarTotem" placeholder="${nomeTotem}">`;
    editarTotemEmail.innerHTML = `Email: <input type="email" id="inputEditarEmailTotem" placeholder="${emailTotem}">`;
    editarTotemSenha.innerHTML = `Senha: <input type="password" id="inputEditarSenhaTotem" placeholder="${senhaTotem}">`;
}



function salvarDadoNovos() {
    var novoNomeTotemTab = inputNovoEditarTotem.value;
    var novoEmailTotemTab = inputEditarEmailTotem.value;
    var novoSenhaTotemTab = inputEditarSenhaTotem.value;

    //Ignorar os espaços das inputs
    novoNomeAtual = novoNomeTotemTab.replace(/\s/g, '');
    novoEmailAtual = novoEmailTotemTab.replace(/\s/g, '');
    novoSenhaAtual = novoSenhaTotemTab.replace(/\s/g, '');

    // Trocas as informações do totem pela novas, mas antes eu verifica se o usuário digitou uma nova informação
    if (novoNomeAtual == "" && novoEmailAtual == "" && novoSenhaAtual == "") {
        mensagemAlerta.innerHTML = `<img src="/img/erro.png" height="40vh"> Nenhum dado foi alterado`;
        mostrarAlerta();
        setTimeout(function () {
            esconderAlerta();
        }, 3000);
    } else {
        esconderInput();
    }

}


function esconderInput() {

    if (novoNomeAtual == "") {
        editarTotemNome.innerHTML = `Nome: 
    <span class="spanTotem" id="nomeTotemSpan">${nomeTotem}</span>`;
    } else {
        editarTotemNome.innerHTML = `Nome: 
        <span class="spanTotem" id="nomeTotemSpan">${novoNomeAtual}</span>`;
    }

    if (novoEmailAtual == "") {
        editarTotemEmail.innerHTML = `Email:
        <span class="spanTotem" id="emailTotemSpan">${emailTotem}</span>`;
    } else {
        editarTotemEmail.innerHTML = `Email:
        <span class="spanTotem" id="emailTotemSpan">${novoEmailAtual}</span>`;
    }

    if (novoSenhaAtual == "") {
        editarTotemSenha.innerHTML = `Senha: 
        <span class="spanTotem" id="senhaTotemSpan">${senhaTotem}</span>`;
    } else {
        var senhaMascarada = "";
        for (var i = 0; i <= novoSenhaAtual.length; i++) {
            senhaMascarada += "*";
        }

        editarTotemSenha.innerHTML = `Senha: 
        <span class="spanTotem" id="senhaTotemSpan">${senhaMascarada}</span>`;
    }
    mensagemAlerta.innerHTML = `<img src='/img/sinal-de-visto.png' height="50vh"> Dados alterados com sucesso!!`;
    mostrarAlerta();
    setTimeout(function () {
        esconderAlerta();
    }, 3000);
}




function mostrarAlerta() {
    mensagemAlerta.style.right = '2%';
    mensagemAlerta.style.opacity = '1';
}

function esconderAlerta() {
    mensagemAlerta.style.right = '-100%';
    mensagemAlerta.style.opacity = '0';

}


// Criar o cadastro de um totem novo
function addTotem() {
    var novoNomeTotemTab = inputNovoNomeTotem.value;
    var novoEmailTotemTab = inputNovoEmailTotem.value;
    var novoSenhaTotemTab = inputNovoSenhaTotem.value;

    //Ignorar os espaços das inputs
    var novoNomeTotem = novoNomeTotemTab.replace(/\s/g, '');
    var novoEmailTotem = novoEmailTotemTab.replace(/\s/g, '');
    var novoSenhaTotem = novoSenhaTotemTab.replace(/\s/g, '');

    if (novoNomeTotem == "" || novoEmailTotem == "" || novoSenhaTotem == "") {
        mensagemAlerta.innerHTML = `<img src="/img/erro.png" height="40vh"> Preencha todos campos para adicionar um totem`;
        mostrarAlerta();
        setTimeout(function () {
            esconderAlerta();
        }, 3000);
    } else {
        mensagemAlerta.innerHTML = `<img src='/img/sinal-de-visto.png' height="50vh"> Totem cadastrado com sucesso!!`;
        mostrarAlerta();
        setTimeout(function () {
            esconderAlerta();
        }, 3000);
        abrirGerenTotem()
    }

}


// Deletar totem 
function deletarTotem() {
    mensagemAlerta.innerHTML = `
    <div class="linha">Tem certeza que deseja apagar esse totem</div>
    <div class="linha">
    <button onclick="fecharDeletarTotem(true)">Sim</button>
    <button onclick="fecharDeletarTotem(false)">Não</button>
    </div>`
    mostrarAlerta();
}

function fecharDeletarTotem(escolha) {
    if (escolha) {
        mensagemAlerta.innerHTML = `<img src='/img/sinal-de-visto.png' height="50vh"> Totem deletado com sucesso`;
    } else {
        mensagemAlerta.innerHTML = `<img src="/img/erro.png" height="40vh"> Cancelado`
    }
    setTimeout(function () {
        esconderAlerta();
    }, 2000);
}

document.getElementById("btn_sair").addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "/";
});