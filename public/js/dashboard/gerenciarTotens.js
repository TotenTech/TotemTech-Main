window.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.ID_USUARIO == undefined) {
        window.location.href = "/erro";
    }
})


/*TODAS AS CONST COM AS TELAS*/
//Vericar se é gerente
const imgNivel1 = document.querySelectorAll(".imagemNivel1");
const imgNivel2 = document.querySelectorAll('.imagemNivel2');

// Pegar todos as checkbox para verificar se ela esta selecionada ou não
const checkboxeDaVez = document.querySelectorAll('input[type="checkbox"]');

// Transição de troca de formularios
const listaTotem = document.getElementById("listaTotemDiv");
const telaAdicionar = document.getElementById("telaAdicionarDiv");
const telaEditar = document.getElementById("telaEditarDiv");
const telaInfo = document.getElementById("telaInfoDiv");


//Pegar o id das linhas que contém o texto e span
const editarTotemNome = document.getElementById("linhaEditarTotemNome");
const editarTotemEmail = document.getElementById("linhaEditarTotemEmail");
const editarTotemSenha = document.getElementById("linhaEditarTotemSenha");

// Mensagem de alerta
const mensagemAlerta = document.getElementById('mensagemAlerta');


// Campos da tela de editação do totem
const nomeTotemEdit = document.getElementById('nomeTotemSpan');
const loginTotemEdit = document.getElementById('emailTotemSpan');
const senhaTotemEdit = document.getElementById('senhaTotemSpan');
const cpuTotemEdit = document.getElementById('checkboxTotemCPU');
const redeTotemEdit = document.getElementById('checkboxTotemRede');
const ramTotemEdit = document.getElementById('checkboxTotemRAM');
const discoTotemEdit = document.getElementById('checkboxTotemDisco');


//Tela de informações do totem
const nomeTotemInfo = document.getElementById('nomeTotemSpanInfo');
const loginTotemInfo = document.getElementById('emailTotemSpanInfo');
const senhaTotemInfo = document.getElementById('senhaTotemSpanInfo');
const cpuTotemInfo = document.getElementById('checkboxTotemCPUInfo');
const redeTotemInfo = document.getElementById('checkboxTotemRedeInfo');
const ramTotemInfo = document.getElementById('checkboxTotemRAMInfo');
const discoTotemInfo = document.getElementById('checkboxTotemDiscoInfo');


/*VARIAVEIS GLOBAIS */
//Nivel de acesso
var nivelAcesso = "";

//Usadas para armanezar o valor do texto que conte as informações do totem
var nomeTotem = "";
var emailTotem = "";
var senhaTotem = "";

//Variáveis com os novos dados de um totem já existente
var novoNomeAtual = "";
var novoEmailAtual = "";
var novoSenhaAtual = "";

// Variáveis com os dados do novo totem
var novoNomeTotem = "";
var novoEmailTotem = "";
var novoSenhaTotem = "";


// Variáveis para saber se uma checkbox ta verdadeira ou falsa e as informações do totem que o usuário deseja ver
var nomeTotemBD = "";
var loginTotemBD = "";
var senhaTotemBD = "";
var cpuTotemBD = "";
var redeTotemBD = "";
var ramTotemBD = "";
var discoTotemBD = "";



//Muda o site com base no nivel de usuario
tipoTelaUsuario();
function tipoTelaUsuario() {
    if (sessionStorage.NIVELACESSO_USUARIO == 1) {
        nivelAcesso = 2;
        imgNivel2.forEach(lixeira => {
            lixeira.style.display = "none";
        })
        imgNivel1.forEach(informacao => {
            informacao.style.display = "block";
        })
    } else {
        nivelAcesso = 1;
        imgNivel1.forEach(informacao => {
            informacao.style.display = "none";
        })
        imgNivel2.forEach(lixeira => {
            lixeira.style.display = "block";
        })
    }

}

// Se ela tiver ele adiciona ".checked" na class das checked fazendo com que ele troque de class
checkboxeDaVez.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            this.nextElementSibling.classList.add('checked');
        } else {
            this.nextElementSibling.classList.remove('checked');
        }
    });
});



// Primeiro ele diminui o tamanho da div
function abrirAddTotem() {
    listaTotem.style.display = "none";
    telaAdicionar.style.display = "flex";
    telaEditar.style.display = "none";
    telaInfo.style.display = "none";
}


function abrirGerenTotem() {
    telaAdicionar.style.display = "none";
    listaTotem.style.display = "flex";
    telaEditar.style.display = "none";
    telaInfo.style.display = "none";
}



// Abrir tela de editar totem
function abrirEditarTotem(idTotem) {
    listaTotem.style.display = "none";
    telaEditar.style.display = "flex";
    telaAdicionar.style.display = "none";
    telaInfo.style.display = "none";
    sessionStorage.ID_TOTEM = idTotem;

    fetch("/dashboard/buscarInfoTotem", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            totemServer: sessionStorage.ID_TOTEM,
        })
    })

        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(json => {
                    sessionStorage.NOME_TOTEM = json.nome;
                    sessionStorage.LOGIN_TOTEM = json.login;
                    sessionStorage.S_T = json.senha;
                    console.log(sessionStorage.ID_TOTEM);
                    buscarInfoTotemComponente(idTotem);
                });
            }
        })
        .catch(function (erro) {
            console.error("Erro ao processar requisição:", erro);
        });
}


function buscarInfoTotemComponente(idTotem) {

    fetch("/dashboard/buscarInfoTotemComponente", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            totemServer: idTotem,
        })
    })

        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(json => {
                    cpuTotemBD = json.cpu;
                    ramTotemBD = json.memoria;
                    discoTotemBD = json.disco;
                    redeTotemBD = json.rede;




                        if (cpuTotemBD == 1) {
                            cpuTotemInfo.checked = true;

                        } else {
                            cpuTotemInfo.checked = false;
                            ;
                        }
                        if (ramTotemBD == 1) {
                            ramTotemInfo.checked = true;

                        } else {
                            ramTotemInfo.checked = false;

                        }
                        if (discoTotemBD == 1) {
                            discoTotemInfo.checked = true;

                        } else {
                            discoTotemInfo.checked = false;

                        }
                        if (redeTotemBD == 1) {
                            redeTotemInfo.checked = true;

                        } else {
                            redeTotemInfo.checked = false;

                        }

                        if (cpuTotemBD == 1) {
                            cpuTotemEdit.checked = true;

                        } else {
                            cpuTotemEdit.checked = false;
                            ;
                        }
                        if (ramTotemBD == 1) {
                            ramTotemEdit.checked = true;

                        } else {
                            ramTotemEdit.checked = false;

                        }
                        if (discoTotemBD == 1) {
                            discoTotemEdit.checked = true;

                        } else {
                            discoTotemEdit.checked = false;

                        }
                        if (redeTotemBD == 1) {
                            redeTotemEdit.checked = true;

                        } else {
                            redeTotemEdit.checked = false;
                    }

                    mostrarInformacoesTelaEditar();
                });
            }
        })
        .catch(function (erro) {
            console.error("Erro ao processar requisição:", erro);
        });
}


function mostrarInformacoesTelaEditar(){

    var senhaMascarada = "";
    for (var i = 0; i <= sessionStorage.S_T.length; i++) {
        senhaMascarada += "*";
    }

    nomeTotemEdit.innerHTML += `${sessionStorage.NOME_TOTEM}`;
    loginTotemEdit.innerHTML += `${sessionStorage.LOGIN_TOTEM}`;
    senhaTotemEdit.innerHTML += `${senhaMascarada}`;

}

//Fechar tela de editar totem
function fecharEditarTotem() {
    nomeTotemEdit.innerHTML = ``;
    loginTotemEdit.innerHTML = ``;
    senhaTotemEdit.innerHTML = ``;

    telaEditar.style.display = "none";
    listaTotem.style.display = "flex";
    telaAdicionar.style.display = "none";
    telaInfo.style.display = "none";

    esconderInput(false);
    location.reload();
}

// Abrir tela de informações do totem para usuário comum
function abrirInformacao(idTotem) {
    telaEditar.style.display = "none";
    listaTotem.style.display = "none";
    telaAdicionar.style.display = "none";
    telaInfo.style.display = "flex";

    fetch("/dashboard/buscarInfoTotem", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            totemServer: sessionStorage.ID_TOTEM,
        })
    })

        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(json => {
                    sessionStorage.NOME_TOTEM = json.nome;
                    sessionStorage.LOGIN_TOTEM = json.login;
                    sessionStorage.S_T = json.senha;
                    console.log(sessionStorage.ID_TOTEM);    

                    nomeTotemInfo.innerHTML = `${sessionStorage.NOME_TOTEM}`;
                    loginTotemInfo.innerHTML = `${sessionStorage.LOGIN_TOTEM}`;
                    senhaTotemInfo.innerHTML = `${sessionStorage.S_T}`;
                    buscarInfoTotemComponente(idTotem);
                });
            }
        })
        .catch(function (erro) {
            console.error("Erro ao processar requisição:", erro);
        });
}

//Fechar tela de informações do totem para usuário comum
function fecharInformacao() {
    telaEditar.style.display = "none";
    listaTotem.style.display = "flex";
    telaAdicionar.style.display = "none";
    telaInfo.style.display = "none";
}




//Troca as informações por input
function editarValores() {

    // Pegar o valor que esta na input, aqui eu pego as informações do totem
    nomeTotem = sessionStorage.NOME_TOTEM;
    loginTotem = sessionStorage.LOGIN_TOTEM;
    senhaTotem = sessionStorage.S_T;

    //Substituir os valores do de cada p 
    editarTotemNome.innerHTML = `Nome: <input type="text" id="inputNovoEditarTotem" placeholder="${sessionStorage.NOME_TOTEM}">`;
    editarTotemEmail.innerHTML = `Email: <input type="text" id="inputEditarEmailTotem" placeholder="${sessionStorage.LOGIN_TOTEM}">`;
    editarTotemSenha.innerHTML = `Senha: <input type="text" id="inputEditarSenhaTotem" placeholder="${sessionStorage.S_T
    }">`;
}



function salvarDadoNovos() {
    var novoNomeTotemTab = inputNovoEditarTotem.value;
    var novoEmailTotemTab = inputEditarEmailTotem.value;
    var novoSenhaTotemTab = inputEditarSenhaTotem.value;

    //Ignorar os espaços das inputs
    novoNomeAtual = novoNomeTotemTab;
    novoEmailAtual = novoEmailTotemTab.replace(/\s/g, '');
    novoSenhaAtual = novoSenhaTotemTab.replace(/\s/g, '');

    if (novoNomeAtual == "" && novoEmailAtual == "" && novoSenhaAtual == "") {
        mensagemAlerta.innerHTML = `<img src="/img/erro.png" height="40vh"> Nenhum dado foi alterado`;
        mostrarAlerta();
        setTimeout(function () {
            esconderAlerta();
        }, 3000);
    } else {
         location.reload();
        esconderInput();
        abrirGerenTotem();
    }

    if (cpuTotemEdit.checked) {
        cpuTotemBD = 1;
    } else {
        cpuTotemBD = 0;
    }
    if (redeTotemEdit.checked) {
        redeTotemBD = 1;
    } else {
        redeTotemBD = 0;
    }
    if (ramTotemEdit.checked) {
        ramTotemBD = 1;
    } else {
        ramTotemBD = 0;
    }
    if (discoTotemEdit.checked) {
        discoTotemBD = 1;
    } else {
        discoTotemBD = 0;
    }

    mensagemAlerta.innerHTML = `<img src='/img/sinal-de-visto.png' height="50vh"> Dados alterados com sucesso!!`;

    fetch("/dashboard/alterarTotemComponente", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cpuServer: cpuTotemBD,
            redeServer: redeTotemBD,
            ramServer: ramTotemBD,
            discoServer: discoTotemBD,
            totemServer: sessionStorage.ID_TOTEM,
        })
    })


}


function esconderInput(validacao) {
    var autenticarNome = "";
    var autenticarEmail = "";
    var autenticarSenha = "";

    if (novoNomeAtual == "") {
        editarTotemNome.innerHTML = `Nome: 
    <span class="spanTotem" id="nomeTotemSpan">${sessionStorage.NOME_TOTEM}</span>`;
        autenticarNome = nomeTotem;
    } else {
        editarTotemNome.innerHTML = `Nome: 
        <span class="spanTotem" id="nomeTotemSpan">${novoNomeAtual}</span>`;
        autenticarNome = novoNomeAtual;
    }

    if (novoEmailAtual == "") {
        editarTotemEmail.innerHTML = `Email:
        <span class="spanTotem" id="emailTotemSpan">${sessionStorage.LOGIN_TOTEM}</span>`;
        autenticarEmail = sessionStorage.LOGIN_TOTEM;
    } else {
        editarTotemEmail.innerHTML = `Email:
        <span class="spanTotem" id="emailTotemSpan">${novoEmailAtual}</span>`;
        autenticarEmail = novoEmailAtual;
    }

    if (novoSenhaAtual == "") {

    var senhaMascarada = "";
    novoSenhaAtual =  sessionStorage.S_T;
    for (var i = 0; i <= novoSenhaAtual.length; i++) {
        senhaMascarada += "*";
    }
        editarTotemSenha.innerHTML = `Senha: 
        <span class="spanTotem" id="senhaTotemSpan">${senhaMascarada}</span>`;
        autenticarSenha = senhaTotem;
        
    } else {
        var senhaMascarada = "";
        for (var i = 0; i <= novoSenhaAtual.length; i++) {
            senhaMascarada += "*";
        }

        editarTotemSenha.innerHTML = `Senha: 
        <span class="spanTotem" id="senhaTotemSpan">${senhaMascarada}</span>`;
        autenticarSenha = novoSenhaAtual;
    }

    if (validacao == false) {
        return false;
    } else {

        fetch("/dashboard/alterarTotem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeServer: autenticarNome,
                loginServer: autenticarEmail,
                senhaServer: autenticarSenha,
                totemServer: sessionStorage.ID_TOTEM,
            })
        })


        mensagemAlerta.innerHTML = `<img src='/img/sinal-de-visto.png' height="50vh"> Dados alterados com sucesso!!`;
        // alterarTotemComponentes();
        mostrarAlerta();
        setTimeout(function () {
            esconderAlerta();
        }, 3000);
    }
}


function alterarTotemComponentes() {
    var cpuC = document.getElementById('checkboxTotemCPU');
    var redeC = document.getElementById('checkboxTotemRede');
    var ramC = document.getElementById('checkboxTotemRAM');
    var discoC = document.getElementById('checkboxTotemDisco');

    if (cpuC.checked) {
        cpuTotemBD = 1;
    } else {
        cpuTotemBD = 0;
    }

    if (redeC.checked) {
        redeTotemBD = 1;
    } else {
        redeTotemBD = 0;
    }

    if (ramC.checked) {
        ramTotemBD = 1;
    } else {
        ramTotemBD = 0;
    }

    if (discoC.checked) {
        discoTotemBD = 1;
    } else {
        discoTotemBD = 0;
    }


    fetch("/dashboard/alterarTotemComponente", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cpuServer: cpuTotemBD,
            redeServer: redeTotemBD,
            ramServer: ramTotemBD,
            discoServer: discoTotemBD,
        })
    })

}


function mostrarAlerta() {
    mensagemAlerta.style.right = '2%';
    mensagemAlerta.style.opacity = '1';
}

function esconderAlerta() {
    mensagemAlerta.style.right = '-100%';
    mensagemAlerta.style.opacity = '0';
    totensCadastrados();

}


// Criar o cadastro de um totem novo
function addTotem() {
    var cpuC = document.getElementById('checkboxCPU');
    var redeC = document.getElementById('checkboxRede');
    var ramC = document.getElementById('checkboxRAM');
    var discoC = document.getElementById('checkboxDisco');
    var novoNomeTotemTab = inputNovoNomeTotem.value;
    var novoEmailTotemTab = inputNovoEmailTotem.value;
    var novoSenhaTotemTab = inputNovoSenhaTotem.value;


    if (cpuC.checked) {
        cpuTotemBD = 1;
    } else {
        cpuTotemBD = 0;
    }

    if (redeC.checked) {
        redeTotemBD = 1;
    } else {
        redeTotemBD = 0;
    }

    if (ramC.checked) {
        ramTotemBD = 1;
    } else {
        ramTotemBD = 0;
    }

    if (discoC.checked) {
        discoTotemBD = 1;
    } else {
        discoTotemBD = 0;
    }


    //Ignorar os espaços das inputs
    novoNomeTotem = novoNomeTotemTab;
    novoEmailTotem = novoEmailTotemTab.replace(/\s/g, '');
    novoSenhaTotem = novoSenhaTotemTab.replace(/\s/g, '');

    if (novoNomeTotem == "" || novoEmailTotem == "" || novoSenhaTotem == "") {
        mensagemAlerta.innerHTML = `<img src="/img/erro.png" height="40vh"> Preencha todos campos para adicionar um totem`;
        mostrarAlerta();
        setTimeout(function () {
            esconderAlerta();
        }, 3000);
    } else {

        mensagemAlerta.innerHTML = `<img src='/img/sinal-de-visto.png' height="50vh"> Totem cadastrado com sucesso!!`;
        mostrarAlerta();
        setTimeout(function () {
            esconderAlerta();
        }, 3000);
        abrirGerenTotem();


        //Cadastrar totem
        fetch("/dashboard/cadastrarTotem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeServer: novoNomeTotem,
                loginServer: novoEmailTotem,
                senhaServer: novoSenhaTotem,
                empresaServer: sessionStorage.EMPRESA_USUARIO,
                cpuServer: cpuTotemBD,
                redeServer: redeTotemBD,
                ramServer: ramTotemBD,
                discoServer: discoTotemBD,
            })
        })
        addTotemComponentes();
    }
}


function addTotemComponentes() {
    //Cadastrar componentes totem
    fetch("/dashboard/cadastrarTotemComponetes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cpuServer: cpuTotemBD,
            redeServer: redeTotemBD,
            ramServer: ramTotemBD,
            discoServer: discoTotemBD,
        })
    })
}


// Deletar totem 
function deletarTotemDecisao(idTotem) {
    mensagemAlerta.innerHTML = `
    <div class="linha">Tem certeza que deseja apagar esse totem</div>
    <div class="linha">
    <button onclick="deletarTotemVisualizacao('${idTotem}')">Sim</button>
    <button onclick="deletarTotemVisualizacao('false')">Não</button>
    </div>`;
    mostrarAlerta();
}


function deletarTotemVisualizacao(idTotem) {
    if (idTotem == "false") {
        mensagemAlerta.innerHTML = `<img src="/img/erro.png" height="40vh"> Cancelado`;
        setTimeout(function () {
            esconderAlerta();
        }, 2000);
    } else {
        mensagemAlerta.innerHTML = `<img src='/img/sinal-de-visto.png' height="50vh"> Totem deletado com sucesso`;


        fetch("/dashboard/deletarTotemVisualizacao", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                totemServer: idTotem,
            })
        })
        deletarTotem(idTotem);
    }
}


function deletarTotem(idTotem) {
    fetch("/dashboard/deletarTotem", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            totemServer: idTotem,
        })
    })

    setTimeout(function () {
        esconderAlerta();
    }, 2000);
}



document.getElementById("btn_sair").addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "/";
});


//Pegar os totens cadastrado na empresa e plotar eles na tela
totensCadastrados();
function totensCadastrados() {
    fetch("/dashboard/listarTotens", {
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
                        listaTotem.innerHTML = "";
                        for (var c = 0; c < resposta.length; c++) {
                            var totem = resposta[c];
                            const listaTotem = document.getElementById('listaTotemDiv');

                            if (sessionStorage.TIPO_USUARIO == 1) {
                                listaTotem.innerHTML += `
                            <li>
                                <p>${totem.nome}</p>
                                <span>
                                 <b class="imagemNivel1" title="Informação" onclick="abrirInformacao('${totem.idtotem}')">?</b>
                                </span>
                            </li>
                        `;
                            } else {
                                listaTotem.innerHTML += `
                            <li>
                                <p>${totem.nome}</p>
                                <span>
                                    <img src="/img/lapis.png" title="Editar" onclick="abrirEditarTotem('${totem.idtotem}')" class="imagemNivel2">
                                    <img src="/img/lixeira.png" title="Excluir" onclick="deletarTotemDecisao('${totem.idtotem}')" class="imagemNivel2">
                                </span>
                            </li>
                        `;
                            }
                        }
                    } else {
                        console.log("Nenhum totem cadastrado.");
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