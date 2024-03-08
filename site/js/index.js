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
document.getElementById('menu-btn').addEventListener('change', function() {
    var menu = document.querySelector('.itensNavMobile');
    if (this.checked) {
        menu.style.left = '0';
    } else {
        menu.style.left = '-300px';
    }
});

document.getElementById('menu-btn').addEventListener('change', function() {
    var menu = document.querySelector('.itensNavMobile2');
    if (this.checked) {
        menu.style.left = '0';
    } else {
        menu.style.left = '-500px';
    }
});

function fecharMenu(){
        var menu = document.querySelector('.itensNavMobile');
        if (this.checked) {
            menu.style.left = '0';
        } else {
            menu.style.left = '-300px'
        }
    }

    function scrollToSection(sectionId) {
        var section = document.getElementById(sectionId);
        window.scrollTo({
            top: section.offsetTop,
            behavior: 'smooth'
        });
        fecharMenu()
    }
