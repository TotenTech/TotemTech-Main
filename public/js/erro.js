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
    window.location.href = "telaLogin.html";
}