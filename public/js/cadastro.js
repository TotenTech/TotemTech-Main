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
var codigoCorreto = false;
var empresaAssociada = "";
//Informações do usuário 
var nome = "";
var email = "";
var senha = "";
var confirmar = "";
var codigo = "";
var nivelAcesso = "";

function fazerCadastroA() {

    var nomeA = inputNomeA.value;
    var emailA = inputEmailA.value;
    var senhaA = inputSenhaA.value;
    var confirmarA = inputConfirmarA.value;
    var codigoA = inputCodigoA.value;
    nivelAcesso = inputNivelAcesso.value;

     nome = nomeA.replace(/\s/g, '');
     email = emailA.replace(/\s/g, '');
     senha = senhaA.replace(/\s/g, '');
     confirmar = confirmarA.replace(/\s/g, '');
     codigo = codigoA.replace(/\s/g, '');

      //Verificar codigo
    fetch("/cadastro/validarCodigo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            codigoServer: codigo,
        })
    })
        .then(function (resposta) {
            resposta.json().then(json => {
                console.log(json);
                if (resposta.ok) {
                    codigoCorreto = true;
                    empresaAssociada = JSON.stringify(json.empresa);
                    validarCadastro();
                } else {
                    return false;
                }
            }).catch(error => {
                validarCadastro();
                return false;
            });

        }).catch(
            function (erro) {
                res.status(500).json(erro.sqlMessage);
            })

}



function fazerCadastroD() {
   var nomeInput = inputNomeD.value;
   var emailInput = inputEmailD.value;
   var senhaInput = inputSenhaD.value;
   var confirmarInput = inputConfirmarD.value;
   var codigoInput = inputCodigoD.value;
   nivelAcesso = inputNivelAcessoD.value;

    nome = nomeInput;
    email = emailInput.replace(/\s/g, '');
    senha = senhaInput.replace(/\s/g, '');
    confirmar = confirmarInput.replace(/\s/g, '');
    codigo = codigoInput.replace(/\s/g, '');

    //Verificar codigo
    fetch("/cadastro/validarCodigo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            codigoServer: codigo,
        })
    })
        .then(function (resposta) {
            resposta.json().then(json => {
                console.log(json);
                if (resposta.ok) {
                    codigoCorreto = true;
                    empresaAssociada = JSON.stringify(json.empresa);
                    validarCadastro();
                } else {
                    return false;
                }
            }).catch(error => {
                validarCadastro();
                return false;
            });

        }).catch(
            function (erro) {
                res.status(500).json(erro.sqlMessage);
            })
}

function validarCadastro(){
    
    if (nome == "" || email == "" || senha == "" || codigo == "" || confirmar == "") {
        mensagemAlerta.innerHTML = `<img src="/img/erro.png">
            Preencha todos os campos`;
    } else if (email.indexOf('@') < 0 || email.indexOf('.') < 0) {
        mensagemAlerta.innerHTML = `<img src="/img/erro.png">
            Preencha o campo do email corretamente utilizando @ e . `;
    } else if (senha.length < 6 || senha.length >= 13) {
        mensagemAlerta.innerHTML = `<img src="/img/erro.png">
            A senha deve ter no minimo 6 e no maximo 12 digitos`;
    } else if (senha != confirmar) {
        mensagemAlerta.innerHTML = `<img src="/img/erro.png">
            Senhas diferentes`;
    }else if(codigoCorreto == false){
        mensagemAlerta.innerHTML = `<img src="/img/erro.png">
        Código Inválido`;
    } else {
        mensagemAlerta.innerHTML = `<img src='/img/sinal-de-visto.png'> Cadastro realizado com sucesso!!`;
        setTimeout(redirecionarLogin, 4000);

        fetch("/cadastro/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                nomeServer: nome,
                emailServer: email,
                senhaServer: senha,
                empresaServer: empresaAssociada,
                nivelAcessoServer: nivelAcesso,
            })
        })

    }

    mostrarAlerta();

}

function redirecionarLogin() {
    window.location.href = "/login";
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
    mensagemAlerta.style.fontSize = "90%";
    mensagemAlerta.style.padding = "1%";
    mensagemAlerta.style.right = '2%';
    mensagemAlerta.style.opacity = '1';
    setTimeout(function () {
        esconderAlerta();
    }, 8000);
}