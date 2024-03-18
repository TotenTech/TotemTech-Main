// Menu Lateral 
document.getElementById('menu-btn').addEventListener('change', function () {
    var menu = document.querySelector('.itensNavMobile');
    if (this.checked) {
        menu.style.left = '0';
    } else {
        menu.style.left = '-1500px';
    }
});

function fecharMenu() {
    var menu = document.querySelector('.itensNavMobile');
    var checkbox = document.getElementById('menu-btn');

    if (this.checked) {
        menu.style.left = '0';
        checkbox.checked = true;
    } else {
        menu.style.left = '-1500px';
        checkbox.checked = false;

    }
}



/*Verificação de mensagem */

var mensagemAlerta = document.getElementById('mensagemAlerta');
var codigoCorreto = "1234567890ABC";

function fazerCadastroA() {

    var nomeA = inputNomeA.value;
    var emailA = inputEmailA.value;
    var senhaA = inputSenhaA.value;
    var confirmarA = inputConfirmarA.value;
    var codigoA = inputCodigoA.value;

    var nome = nomeA.replace(/\s/g, '');
    var email = emailA.replace(/\s/g, '');
    var senha = senhaA.replace(/\s/g, '');
    var confirmar = confirmarA.replace(/\s/g, '');
    var codigo = codigoA.replace(/\s/g, '')


    if (nome == "" || email == "" || senha == "" || codigo == "" || confirmar == "") {
        mensagemAlerta.innerHTML = `<img src="../public/img/erro.png">
            Preencha todos os campos`;
    } else if (email.indexOf('@') < 0 || email.indexOf('.') < 0) {
        mensagemAlerta.innerHTML = `<img src="../public/img/erro.png">
            Preencha o campo do email corretamente utilizando @ e . `;
    } else if (senha.length < 6) {
        mensagemAlerta.innerHTML = `<img src="../public/img/erro.png">
            A senha deve ter no minimo 6 digitos`;
    } else if (senha != confirmar) {
        mensagemAlerta.innerHTML = `<img src="../public/img/erro.png">
            Senhas diferentes`;
    } else if (codigoCorreto == codigo) {
        mensagemAlerta.innerHTML = `<img src='../public/img/sinal-de-visto.png'> Cadastro realizado com sucesso!!`;
        setTimeout(redirecionarLogin, 4000);
    } else {
        mensagemAlerta.innerHTML = `<img src="../public/img/erro.png">
            Código Inválido`;
    }

    mostrarAlerta();
}

function fazerCadastroD() {
    var nomeD = inputNomeD.value;
    var emailD = inputEmailD.value;
    var senhaD = inputSenhaD.value;
    var confirmarD = inputConfirmarD.value;
    var codigoD = inputCodigoD.value;

    var nome = nomeD.replace(/\s/g, '');
    var email = emailD.replace(/\s/g, '');
    var senha = senhaD.replace(/\s/g, '');
    var confirmar = confirmarD.replace(/\s/g, '');
    var codigo = codigoD.replace(/\s/g, '')


    if (nome == "" || email == "" || senha == "" || codigo == "" || confirmar == "") {
        mensagemAlerta.innerHTML = `<img src="../public/img/erro.png">
            Preencha todos os campos`;
    } else if (email.indexOf('@') < 0 || email.indexOf('.') < 0) {
        mensagemAlerta.innerHTML = `<img src="../public/img/erro.png">
            Preencha o campo do email corretamente utilizando @ e . `;
    } else if (senha.length < 6) {
        mensagemAlerta.innerHTML = `<img src="../public/img/erro.png">
            A senha deve ter no minimo 6 digitos`;
    } else if (senha != confirmar) {
        mensagemAlerta.innerHTML = `<img src="../public/img/erro.png">
            Senhas diferentes`;
    } else if (codigoCorreto == codigo) {
        mensagemAlerta.innerHTML = `<img src='../public/img/sinal-de-visto.png'> Cadastro realizado com sucesso!!`;
        setTimeout(redirecionarLogin, 4000);
    } else {
        mensagemAlerta.innerHTML = `<img src="../public/img/erro.png">
            Código Inválido`;
    }

    mostrarAlerta();
}

function redirecionarLogin() {
    window.location.href = "telaLogin.html";
}

function mostrarAlerta() {
    if (mensagemAlerta.style.right == "2%") {
        mensagemAlerta.style.right = '-100%';
        mensagemAlerta.style.opacity = '0';
    } else {
        mensagemAlerta.style.right = '2%';
        mensagemAlerta.style.opacity = '1';
        setTimeout(function () {
            mostrarAlerta();
        }, 3000);
    }
}   