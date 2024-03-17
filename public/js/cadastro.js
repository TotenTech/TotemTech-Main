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

function fazerCadastro() {
    var codigoCorreto = "1234567890ABC"
    var larguraTela = window.innerWidth;

    if (larguraTela < 992) {
        var nomeA = inputNomeA.value;
        var emailA = inputEmailA.value;
        var senhaA = inputSenhaA.value;
        var confirmarA = inputConfirmarA.value;
        var codigoA = inputCodigoA.value;
        
        if(nomeA =="" || emailA =="" || senhaA =="" || codigoA == "" || confirmarA == ""){
            mensagemAlerta.innerHTML = `<img src="../public/img/erro.png">
            Preencha todos os campos`;
        }else if(senhaA != confirmarA){
            mensagemAlerta.innerHTML = `<img src="../public/img/erro.png">
            Senhas diferentes`;
        }else if(codigoCorreto == codigoA){
            mensagemAlerta.innerHTML = `<img src='../public/img/sinal-de-visto.png'> Cadastro realizado com sucesso!!`;
            setTimeout(redirecionarLogin, 4000);  
        }else{
            mensagemAlerta.innerHTML = `<img src="../public/img/erro.png">
            Código Inválido`;
        }
    } else {
        var nomeD = inputNomeD.value;
        var emailD = inputEmailD.value;
        var senhaD = inputSenhaD.value;
        var confirmarD = inputConfirmarD.value;
        var codigoD = inputCodigoD.value;
    
        
        if(nomeD =="" || emailD =="" || senhaD =="" || codigoD == "" || confirmarD == ""){
            mensagemAlerta.innerHTML = `<img src="../public/img/erro.png">
            Preencha todos os campos`;
        }else if(senhaD != confirmarD){
            mensagemAlerta.innerHTML = `<img src="../public/img/erro.png">
            Senhas diferentes`;
        }else if(codigoCorreto == codigoD){
            mensagemAlerta.innerHTML = `<img src='../public/img/sinal-de-visto.png'> Cadastro realizado com sucesso!!`;
            setTimeout(redirecionarLogin, 4000);  
        }else{
            mensagemAlerta.innerHTML = `<img src="../public/img/erro.png">
            Código Inválido`;
        }
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