window.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.ID_USUARIO == undefined) {
        window.location.href = "/erro";
    }
});


//Definir o nome do usuário e empresa
const nameUser = document.getElementById('spanNameUser');
const nameCompany = document.getElementById('spanNameCompany');
nameUser.innerHTML = `${sessionStorage.NOME_USUARIO}`;
nameCompany.innerHTML = `${sessionStorage.NOME_EMPRESA}`;



// Tela de editar as informações do usuario
const screenEditBox = document.getElementById('screenEditBoxDiv');

// Mensagem de alerta
const alertMessage = document.getElementById('alertMessage');

// Tabela de usuaários
const tableUser = document.getElementById('tableUserBox');

// Total de usuarios
// Total de administradores
// Total de funcionario
const totalUsuario = document.getElementById("spanTotalUsuario");
const administradorUsuario = document.getElementById("spanAdministradorUsuario");
const funcionarioUsuario = document.getElementById("spanFuncionarioUsuario");

//Mostra fundo modal de add usuário e editar
const screenAddUserFundo = document.getElementById('screenAddUserFundoDiv');

// Modal de add usuario
const screenEditarUser = document.getElementById("screenEditarUserDiv");

// Div que contem a caixa de texto da senha
var inputGrupoSenha = "";

// VARIAVEIS
var administrador = 0;
var funcionario = 0;

// Nova senha editar
var senhaNovaUsuario = "";

function screenEdit(visivel, idusuario) {
    if (visivel) {
        screenEditBox.style.display = "none";
        screenAddUserFundo.style.display = "none";
    } else {
        screenAddUserFundo.style.display = "none";
        screenEditBox.style.display = "block";
        if (idusuario != undefined) {
            mostrarInfoUsuario(idusuario);
        }
    }
}

function mostrarSenha(visivel) {
    inputGrupoSenha = document.getElementById('inputGrupoSenhaBox');
    var senhaMascarada = "";
    if (visivel) {
        inputGrupoSenha.innerHTML = `
        <input type="text" value="${sessionStorage.SENHA_USUARIO_INFO}" id="inputSenhaUsuarioEditar" >
        <label for="">Senha</label>
        <i class="bi bi-eye-fill" id="olhoImg" onclick="mostrarSenha(false)"></i>`;
    } else {
        var senhaUsuario = inputSenhaUsuarioEditar.value;

        if (senhaUsuario == "" || senhaUsuario == undefined) {
        } else {
            sessionStorage.SENHA_USUARIO_INFO = senhaUsuario;
        }
        for (var c = 0; c < sessionStorage.SENHA_USUARIO_INFO.length; c++) {
            senhaMascarada += "*";
        }

        inputGrupoSenha.innerHTML = `
        <input type="text" placeholder="${senhaMascarada}" class="senha" id="inputSenhaUsuarioEditar">
        <label for="">Senha</label>
        <i class="bi bi-eye-slash-fill" id="olhoImg" onclick="mostrarSenha(true)"></i>`;


    }

}


function mostrarSenhaAdd(visivel) {
    const inputGrupoSenha = document.getElementById('inputGrupoSenhaBoxAdd');
    inputGrupoSenha.innerHTML = '';
    if (visivel) {
        inputGrupoSenha.innerHTML = `
        <input type="text" placeholder="Senha" >
        <label for="">Senha</label>
        <i class="bi bi-eye-fill" id="olhoImgAdd" onclick="mostrarSenhaAdd(false)"></i>`;
    } else {
        inputGrupoSenha.innerHTML = `
        <input type="text" placeholder="*******" >
        <label for="">Senha</label>
        <i class="bi bi-eye-slash-fill" id="olhoImgAdd" onclick="mostrarSenhaAdd(true)"></i>`;
    }

}


function screenAddUserMostrar(mostrar) {

    if (mostrar) {
        screenAddUserFundo.style.display = "flex";
    } else {
        screenAddUserFundo.style.display = "none";
    }
}

function mostrarInfoUsuario(idusuario) {
    fetch("/dashboard/buscarInfoUsuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idServer: idusuario,
        })
    })
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(json => {
                    sessionStorage.NOME_USUARIO_INFO = json.nome;
                    sessionStorage.EMAIL_USUARIO_INFO = json.email;
                    sessionStorage.SENHA_USUARIO_INFO = json.senha;
                    sessionStorage.TIPO_USUARIO_INFO = json.tipo;

                    if (sessionStorage.TIPO_USUARIO_INFO == 1) {
                        sessionStorage.TIPO_USUARIO_INFO = "Funcionario";
                    } else {
                        sessionStorage.TIPO_USUARIO_INFO = "Administrador";
                    }

                    screenEditBox.innerHTML = ``;
                    screenEditBox.innerHTML = `
                <div class="lineTitulo">
                    <h3>Editar Usuário</h3>
                    <button class="fechar" onclick="screenEdit(true)">X</button>
                </div>
                <div class="inputGrupo">
                    <input type="text" value="${sessionStorage.NOME_USUARIO_INFO}" id="inputNomeUsuarioEditar">
                    <label for="">Nome</label>
                </div>

                <div class="inputGrupo">
                    <input type="email" value="${sessionStorage.EMAIL_USUARIO_INFO}" id="inputEmailUsuarioEditar">
                    <label for="">E-mail</label>
                </div>

                <div class="inputGrupo" id="inputGrupoSenhaBox">
                    <input type="text" value="" id="inputSenhaUsuarioEditar">
                    <label for="">Senha</label>
                    <i class="bi bi-eye-fill" id="olhoImgAdd" onclick="mostrarSenha(true)"></i>
                </div>`;

                    if (sessionStorage.TIPO_USUARIO_INFO == "Funcionario") {
                        screenEditBox.innerHTML += `<div class="inputGrupo">
                    <select id="inputNivelAcessoUsuarioEditar">
                        <option value="1">Funcionario</option>
                        <option value="2">Administrador</option>
                    </select>
                    <label for="">Nível De Acesso</label>
                </div>`;
                    } else {
                        screenEditBox.innerHTML += `<div class="inputGrupo">
                    <select id="inputNivelAcessoUsuarioEditar">
                        <option value="2">Administrador</option>
                        <option value="1">Funcionario</option>
                    </select>
                    <label for="">Nível De Acesso</label>
                </div>`;
                    }

                    screenEditBox.innerHTML += `
                <div class="line">
                    <button onclick="editarUsuario(${idusuario})" class="editar">Editar</button>
                </div>`;
                });
                setTimeout(function () {
                    mostrarSenha(false);
                }, 200)

            }
        })
        .catch(function (erro) {
            console.log("Deu Erro")
            console.error("Erro ao processar requisição:", erro);
        });
}


function addUsuario() {
    var nomeUsuario = inputNomeUsuario.value;
    var emailUsuario = inputEmailUsuario.value;
    var senhaUsuario = inputSenhaUsuario.value;
    var nivelAcessoUsuario = inputNivelAcessoUsuario.value;

    if (nomeUsuario == "" || emailUsuario == "" || senhaUsuario == "") {
        alertMessage.innerHTML = `<img src="/img/erro.png" height="40vh"> Preencha todos os campos`;
    } else if (senhaUsuario.length > 12) {
        alertMessage.innerHTML = `<img src="/img/erro.png" height="40vh"> A senha deve ter no máximo 12 digitos`;
    } else {

        fetch("/dashboard/cadastrarUsuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeServer: nomeUsuario,
                emailServer: emailUsuario,
                senhaServer: senhaUsuario,
                nivelAcessoServer: nivelAcessoUsuario,
                empresaServer: sessionStorage.EMPRESA_USUARIO,
            })
        })
        alertMessage.innerHTML = `<img src='/img/sinal-de-visto.png' height="50vh"> Usuário cadastrado com sucesso!!`;
        screenAddUserMostrar(false);
    }
    mostrarAlerta();
    setTimeout(function () {
        esconderAlerta();
    }, 3000)
}

listarUsuarios();
function listarUsuarios() {
    fetch("/dashboard/listarUsuarios", {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            empresaServer: sessionStorage.EMPRESA_USUARIO,
        })
    })
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    if (resposta.length > 0) {
                        tableUser.innerHTML = `  <div class="lineDescription">
                        <span class="deletar">Deletar</span>
                        <span class="editar">Editar</span>
                        <span class="nome">Nome</span>
                        <span class="email">E-mail</span>
                        <span class="acesso">Acesso</span>
                    </div> `;


                        administrador = 0;
                        funcionario = 0;

                        for (var c = 0; c < resposta.length; c++) {
                            var usuario = resposta[c];
                            var tipo = "Funcionario";

                            if (usuario.tipo == 2) {
                                tipo = "Administrador"
                                administrador++;
                            } else {
                                funcionario++;
                            }

                            if (c % 2 == 0) {
                                tableUser.innerHTML += `
                                <div class="lineDark">
                                <div class="imagem">
                                    <img src="../../img/lixeira-de-reciclagem.png" class="lixeira" onclick="mostrarAlerta(${usuario.idusuario})">
                                </div>
                                <div class="imagem">
                                    <img src="../../img/ferramenta-lapis.png" class="lapis" onclick="screenEdit(false, ${usuario.idusuario})">
                                </div>
                                <span class="nome">${usuario.nome}</span>
                                <span class="email">${usuario.email}</span>
                                <span class="acesso">${tipo}</span>
                            </div>
                        `;
                            } else {
                                tableUser.innerHTML += `
                                <div class="lineWhite">
                                <div class="imagem">
                                    <img src="../../img/lixeira-de-reciclagem.png" class="lixeira" onclick="mostrarAlerta(${usuario.idusuario})">
                                </div>
                                <div class="imagem">
                                    <img src="../../img/ferramenta-lapis.png" class="lapis" onclick="screenEdit(false, ${usuario.idusuario})">
                                </div>
                                <span class="nome">${usuario.nome}</span>
                                <span class="email">${usuario.email}</span>
                                <span class="acesso">${tipo}</span>
                            </div>
                        `;
                            }
                        }

                        totalUsuario.innerHTML = `${funcionario + administrador}`;
                        administradorUsuario.innerHTML = `${administrador}`;
                        funcionarioUsuario.innerHTML = `${funcionario}`;

                    } else {
                        console.log("Nenhum Usuário cadastrado.");
                    }
                });
            } else {
                console.error("Erro na requisição:", resposta.status);
            }
        })
        .catch(function (erro) {
            console.error("Erro ao processar requisição:", erro);
        });

}

function deletarUsuarioDecisao(idusuario) {
    alertMessage.innerHTML = `
    <div class="line">Tem certeza que deseja apagar esse usuário</div>
    <div class="line">
    <button onclick="deletarUsuario('${idusuario}')">Sim</button>
    <button onclick="deletarUsuario('false')">Não</button>
    </div>`;
    mostrarAlerta();
}

function deletarUsuario(idusuario) {
    if (idusuario == "false") {
        alertMessage.innerHTML = `<img src="/img/erro.png" height="40vh"> Cancelado`;
    } else {
        alertMessage.innerHTML = `<img src='/img/sinal-de-visto.png' height="50vh"> Usuário deletado com sucesso`;

        fetch("/dashboard/deletarUsuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idServer: idusuario,
            })
        })
    }

    setTimeout(function () {
        esconderAlerta();
    }, 2000);
}

function editarUsuario(idusuario) {
    var nomeUsuario = inputNomeUsuarioEditar.value;
    var emailUsuario = inputEmailUsuarioEditar.value;
    var senhaUsuario = inputSenhaUsuarioEditar.value;
    var nivelAcessoUsuario = inputNivelAcessoUsuarioEditar.value;

    if (nomeUsuario == "" || emailUsuario == "" || sessionStorage.SENHA_USUARIO_INFO == "") {
        alertMessage.innerHTML = `<img src="/img/erro.png" height="40vh"> Nenhum campo deve ser vazio`;
    } else if (senhaUsuario.length > 12) {
        alertMessage.innerHTML = `<img src="/img/erro.png" height="40vh"> A senha deve ter no máximo 12 digitos`;
    } else {

        if(senhaUsuario == ""){
            senhaUsuario = sessionStorage.SENHA_USUARIO_INFO;
        }

        fetch("/dashboard/editarUsuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idServer: idusuario,
                nomeServer: nomeUsuario,
                emailServer: emailUsuario,
                senhaServer: senhaUsuario,
                tipoServer: nivelAcessoUsuario,
            })
        })
        alertMessage.innerHTML = `<img src='/img/sinal-de-visto.png' height="50vh"> Usuário cadastrado com sucesso!!`;
        screenEdit(true);
    }
    mostrarAlerta();
    setTimeout(function () {
        esconderAlerta();
    }, 2000)
}

function mostrarAlerta(idUsuario) {
    alertMessage.style.right = '2%';
    alertMessage.style.opacity = '1';
    if (idUsuario != undefined) {
        deletarUsuarioDecisao(idUsuario);
    }
}

function esconderAlerta() {
    alertMessage.style.right = '-100%';
    alertMessage.style.opacity = '0';
    listarUsuarios();
}

document.getElementById("btn_sair").addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "/";
});