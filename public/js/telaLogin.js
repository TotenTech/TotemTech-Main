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


function fazerLogin() {
    var emailCorreto = "totemTech@gmail.com";
    var senhaCorreta = "totem1234";
    var larguraTela =  window.innerWidth;

    if ( larguraTela < 992) {
        var emailA = inputEmailA.value;
        var senhaA = inputSenhaA.value;

        if (emailA == emailCorreto && senhaA == senhaCorreta) {
            mensagemAlerta.innerHTML = `<img src='../public/img/sinal-de-visto.png'> Você será direcionado para a Dashboard`;
            setTimeout(redirecionarDash, 4000);
        } else if (emailA == "" || senhaA == "") {
            mensagemAlerta.innerHTML = `<img src="../public/img/erro.png">
         Preencha todos os campos`;

        } else {
            mensagemAlerta.innerHTML = `<img src="../public/img/erro.png">
            Email ou senha incorreto`;

        }
    } else {
        var emailD = inputEmailD.value;
        var senhaD = inputSenhaD.value;

        if (emailD == emailCorreto && senhaD == senhaCorreta) {
            mensagemAlerta.innerHTML = `<img src='../public/img/sinal-de-visto.png'> Você será direcionado para a Dashboard`;
            setTimeout(redirecionarDash, 4000);
        
        } else if (emailD == "" || senhaD == "") {
            mensagemAlerta.innerHTML = `<img src="../public/img/erro.png">
         Preencha todos os campos`;

        } else {
            mensagemAlerta.innerHTML = `<img src="../public/img/erro.png">
            Email ou senha incorreto`;

        }
    }
    mostrarAlerta();
}


function redirecionarDash(){
    window.location.href = "dashTotens.html";
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