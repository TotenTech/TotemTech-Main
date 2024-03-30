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
var codigoCorreto = "";

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

//Informações do usuário 
var nome = "";
var emailD = "";
var senhaD = "";
var confirmarD = "";
var codigoD = "";

function fazerCadastroD() {
    nome = inputNomeD.value;
    emailD = inputEmailD.value;
    senhaD = inputSenhaD.value;
    confirmarD = inputConfirmarD.value;
    codigoD = inputCodigoD.value;

    var email = emailD.replace(/\s/g, '');
    var senha = senhaD.replace(/\s/g, '');
    var confirmar = confirmarD.replace(/\s/g, '');
    var codigo = codigoD.replace(/\s/g, '')


    
    //Verificar codigo
    fetch("/codigoRouter/validarCodigo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            codigoServer: codigo,
        })
    })
    .then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.CODIGO_EMPRESA = json.codigo;
            });
        } else {
            console.log("Houve um erro ao tentar validar o codigo!");
            
            resposta.text().then(texto => {
                console.error(texto);
                finalizarAguardar(texto);    
            });
            return false;
        }
        
    }).catch(
        function (erro) {
            res.status(500).json(erro.sqlMessage );
            
    })


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


    fetch("/cadastro/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            nomeServer: nome,
            emailServer: email,
            senhaServer: senha,
            codigoServer: codigo,
        })
    })
}

function redirecionarLogin() {
    window.location.href = "telaLogin.html";
}

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

}


//tooltip
function tooltip() {
    mensagemAlerta.innerHTML = `O código de acesso é fornecido à empresa para identificar a qual empresa você será associado.`;
    mensagemAlerta.style.fontSize = "10px";
    mensagemAlerta.style.padding = "1%";
    mensagemAlerta.style.right = '2%';
    mensagemAlerta.style.opacity = '1';
    setTimeout(function () {
        esconderAlerta();
    }, 8000);
}