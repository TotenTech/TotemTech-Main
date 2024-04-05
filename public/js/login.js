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



var email = "";
var senha = "";

function fazerLoginA() {
    var emailA = inputEmailA.value;
    var senhaA = inputSenhaA.value;


    email = emailA.replace(/\s/g, '');
    senha = senhaA.replace(/\s/g, '');

    if (email == "" || senha == "") {
        mensagemAlerta.innerHTML = `<img src="/img/erro.png">
     Preencha todos os campos`;
     mostrarAlerta();

    } else {
        validarCadastro();
    }
}

function fazerLoginD() {
    var emailD = inputEmailD.value;
    var senhaD = inputSenhaD.value;


    email = emailD.replace(/\s/g, '');
    senha = senhaD.replace(/\s/g, '');

    if (email == "" || senha == "") {
        mensagemAlerta.innerHTML = `<img src="/img/erro.png">
     Preencha todos os campos`;
     mostrarAlerta();

    } else {
        validarCadastro();
    }
}

function validarCadastro(){
    fetch("/login/verificarLogin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: email,
            senhaServer: senha,
        })
    })
        .then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")

            if (resposta.ok) {
                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    sessionStorage.IDUSUSUARIO_USUARIO = json.id;
                    sessionStorage.NOMEUSUARIO_USUARIO = json.nome;
                    sessionStorage.EMAILUSUARIO_USUARIO = json.email;
                    sessionStorage.SENHAUSUARIO_USUARIO = json.senha;
                    sessionStorage.EMPRESAUSUARIO_USUARIO = json.imagem;
                    mensagemAlerta.innerHTML = `<img src='/img/sinal-de-visto.png'> Você será direcionado para a Dashboard`;
                    mostrarAlerta();
                    setTimeout(redirecionarDash, 4000);
                });
            } else {
                mensagemAlerta.innerHTML = `<img src="/img/erro.png">
            Email ou senha incorreto`;
                mostrarAlerta();
                resposta.text().then(texto => {
                    finalizarAguardar(texto);
                });
                return false;
            }

        }).catch(
            function (erro) {
                mensagemAlerta.innerHTML = `<img src="/img/erro.png">
            Email ou senha incorreto`;
                mostrarAlerta();
                res.status(500).json(erro.sqlMessage);

            })
}


function redirecionarDash() {
    window.location.href = "/dashboard";
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