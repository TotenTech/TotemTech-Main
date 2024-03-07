var telaLogin = document.getElementById('divTelaLogin');
var telaPrincipal = document.getElementById('divTelaPrincipal');

function abrirLogin1(){
    telaPrincipal.style.opacity = "0";
    setTimeout(abrirLogin2, 500);
}

function abrirLogin2(){
    telaPrincipal.style.display = "none";
    telaLogin.style.display = "flex";
    setTimeout(abrirLogin3, 500);
}

function abrirLogin3(){
    telaLogin.style.opacity = "1";
}

function abrirHome1(){
    telaLogin.style.opacity = "0";
    setTimeout(abrirHome2, 500);
}

function abrirHome2(){
    telaLogin.style.display = "none";
    telaPrincipal.style.display = "flex";
    setTimeout(abrirHome3, 500);
}

function abrirHome3(){
    telaPrincipal.style.opacity = "1";
}

// Menu Lateral 
function abrirMenu() {
    var menuMobile = document.querySelector('.itensNavMobile');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
       
    } else {
        menuMobile.classList.add('open');
       
    }
}