window.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.ID_USUARIO == undefined) {
        window.location.href = "/erro";
    }
})

// Pegar todos as checkbox para verificar se ela esta selecionada ou não
const checkboxeDaVez = document.querySelectorAll('input[type="checkbox"]');
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


// Transição de troca de formularios
var listaTotem = document.getElementById("listaTotemDiv");
var telaAdicionar = document.getElementById("telaAdicionarDiv");
var telaEditar = document.getElementById("telaEditarDiv");

// Primeiro ele diminui o tamanho da div
function abrirAddTotem1() {
    listaTotem.style.width = "0";
    listaTotem.style.padding = "0";
    setTimeout(abrirAddTotem2, 1100);
}
// Depois ele deixa uma invisível e deixa a outra visível 
function abrirAddTotem2() {
    listaTotem.style.display = "none";
    telaAdicionar.style.display = "flex";
    telaEditar.style.display = "none";
    telaAdicionar.style.padding = "2%"
    setTimeout(abrirAddTotem3, 100);
}
// Aumenta o tamanho da nova div
function abrirAddTotem3() {
    telaAdicionar.style.width = "80%";
}


function abrirGerenTotem01() {
    telaAdicionar.style.width = "0";
    telaAdicionar.style.padding = "0";
    setTimeout(abrirGerenTotem02, 1100);
}

function abrirGerenTotem02() {
    telaAdicionar.style.display = "none";
    listaTotem.style.display = "flex";
    listaTotem.style.padding = "2%";
    setTimeout(abrirGerenTotem03, 100);
}

function abrirGerenTotem03() {
    listaTotem.style.width = "80%";
}



// Abrir tela de editar totem
function abrirEditarTotem01(){
    listaTotem.style.opacity = "0";
    setTimeout(abrirEditarTotem02,1100);
}

function abrirEditarTotem02(){
    listaTotem.style.display = "none";
    telaEditar.style.display = "flex";
    setTimeout(abrirEditarTotem03, 100);
}

function abrirEditarTotem03(){
    telaEditar.style.opacity = "1";
}

//Fechar tela de editar totem
function fecharEditarTotem01(){
    telaEditar.style.opacity = "0";
    setTimeout(fecharEditarTotem02, 1100);
}

function fecharEditarTotem02(){
    telaEditar.style.display = "none";
    listaTotem.style.display = "flex";
    setTimeout(fecharEditarTotem03, 100);
}

function fecharEditarTotem03(){
    listaTotem.style.opacity = "1";
}

//Troca as informações por input
var nomeTotem = "";
var emailTotem = "";
var senhaTotem = "";

//Pegar o id das linhas que contém o texto e span
var editarTotemNome = document.getElementById("linhaEditarTotemNome");
var editarTotemEmail = document.getElementById("linhaEditarTotemEmail");
var editarTotemSenha = document.getElementById("linhaEditarTotemSenha");

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
    var novoNomeAtual = novoNomeTotemTab.replace(/\s/g, '');
    var novoEmailAtual = novoEmailTotemTab.replace(/\s/g, '');
    var novoSenhaAtual = novoSenhaTotemTab.replace(/\s/g, '');

    // Trocas as informações do totem pela novas, mas antes eu verifica se o usuário digitou uma nova informação
    if (novoNomeAtual == "" && novoEmailAtual == "" && novoSenhaAtual == "") {
        mensagemAlerta.innerHTML = `<img src="/img/erro.png" height="40vh"> Nenhum dado foi alterado`;
        mostrarAlerta();
        setTimeout(function () {
            esconderAlerta();
        }, 3000);
    }else{

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

}


// Mensagem de alerta
var mensagemAlerta = document.getElementById('mensagemAlerta');

function mostrarAlerta() {
    mensagemAlerta.style.right = '2%';
    mensagemAlerta.style.opacity = '1';
}

function esconderAlerta() {
    mensagemAlerta.style.right = '-100%';
    mensagemAlerta.style.opacity = '0';

}


// Criar o cadastro de um totem novo
function addTotem(){
    var novoNomeTotemTab = inputNovoNomeTotem.value;
    var novoEmailTotemTab = inputNovoEmailTotem.value;
    var novoSenhaTotemTab = inputNovoSenhaTotem.value;

     //Ignorar os espaços das inputs
     var novoNomeTotem = novoNomeTotemTab.replace(/\s/g, '');
     var novoEmailTotem = novoEmailTotemTab.replace(/\s/g, '');
     var novoSenhaTotem = novoSenhaTotemTab.replace(/\s/g, '');
 
    if(novoNomeTotem == "" || novoEmailTotem == "" || novoSenhaTotem == ""){
        mensagemAlerta.innerHTML = `<img src="/img/erro.png" height="40vh"> Preencha todos campos para adicionar um totem`;
        mostrarAlerta();
        setTimeout(function () {
            esconderAlerta();
        }, 3000);       
    }else{
        mensagemAlerta.innerHTML = `<img src='/img/sinal-de-visto.png' height="50vh"> Totem cadastrado com sucesso!!`;
        mostrarAlerta();
        setTimeout(function () {
            esconderAlerta();
        }, 3000);
        abrirGerenTotem01()
    }
    
}


// Deletar totem 
function deletarTotem(){
    mensagemAlerta.innerHTML = `
    <div class="linha">Tem certeza que deseja apagar esse totem</div>
    <div class="linha">
    <button onclick="fecharDeletarTotem(true)">Sim</button>
    <button onclick="fecharDeletarTotem(false)">Não</button>
    </div>`
    mostrarAlerta();
}

function fecharDeletarTotem(escolha){
    if(escolha){
        mensagemAlerta.innerHTML = `<img src='/img/sinal-de-visto.png' height="50vh"> Totem deletado com sucesso`;
    }else{
        mensagemAlerta.innerHTML = `<img src="/img/erro.png" height="40vh"> Cancelado`
    }
    setTimeout(function () {
        esconderAlerta();
    }, 2000);
}

document.getElementById("btn_sair").addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "/";
})