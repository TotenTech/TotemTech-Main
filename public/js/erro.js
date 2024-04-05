// Mensagem de Alerta
function mostrarAlerta() {
    mensagemAlerta.style.right = '2%';
    mensagemAlerta.style.opacity = '1';
    setTimeout(function () {
        esconderAlerta();
    }, 3000);
}

function esconderAlerta() {
    mensagemAlerta.style.right = '-100%';
    mensagemAlerta.style.opacity = '0';
    setTimeout(function () {
        redirecionarLogin();
    }, 1000);
}

function redirecionarLogin() {
    window.location.href = "/login";
}



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