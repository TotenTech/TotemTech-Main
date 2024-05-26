window.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.ID_USUARIO == undefined) {
        window.location.href = "/erro";
    }
})


// Definir telas disponiveis por nivel de acesso
if(sessionStorage.TIPO_USUARIO == "1"){
    const screenGerenciarUsuario = document.getElementById("screenGerenciarUsuarioLi");
    screenGerenciarUsuario.style.display = "none";
}


/*TODAS AS CONST COM AS TELAS*/
//Vericar se é gerente
const imgNivel1 = document.querySelectorAll(".imagemNivel1");
const imgNivel2 = document.querySelectorAll('.imagemNivel2');

// Pegar todos as checkbox para verificar se ela esta selecionada ou não
const checkboxeDaVez = document.querySelectorAll('input[type="checkbox"]');

// Transição de troca de formularios
const listTotem = document.getElementById("listTotemDiv");
const screenAdd = document.getElementById("screenAddDiv");
const screenEdit = document.getElementById("screenEditDiv");
const screenInfo = document.getElementById("screenInfoDiv");
const bigBox = document.getElementById('bigBoxDiv');


//Pegar o id das linhas que contém o texto e span
const editarTotemNome = document.getElementById("lineEditTotemNome");
const editarTotemEmail = document.getElementById("lineEditTotemEmail");
const editarTotemSenha = document.getElementById("lineEditTotemSenha");
const editarTotemSistemaOperacional = document.getElementById("lineEditTotemSistemaOperacional");
const editarTotemTotalRam = document.getElementById("lineEditTotemTotalRam");

// Mensagem de alerta
const alertMessage = document.getElementById('alertMessage');


// Campos da tela de editação do totem
const nomeTotemEdit = document.getElementById('nomeTotemSpan');
const loginTotemEdit = document.getElementById('emailTotemSpan');
const senhaTotemEdit = document.getElementById('senhaTotemSpan');
const sistemaOperacionalTotemEdit = document.getElementById('sistemaOperacionalTotemSpan');
const tipoDisco1TotemEdit = document.getElementById('tipoDisco1SpanTotem');
const totalDisco1TotemEdit = document.getElementById('totalDisco1SpanTotem');
const tipoDisco2TotemEdit = document.getElementById('tipoDisco2SpanTotem');
const totalDisco2TotemEdit = document.getElementById('totalDisco2SpanTotem');
const totalRamTotemEdit = document.getElementById('totalRamSpanTotem');
const cpuTotemEdit = document.getElementById('checkboxTotemCPU');
const redeTotemEdit = document.getElementById('checkboxTotemRede');
const ramTotemEdit = document.getElementById('checkboxTotemRAM');
const discoTotemEdit = document.getElementById('checkboxTotemDisco');


//Tela de informações do totem
const nomeTotemInfo = document.getElementById('nomeTotemSpanInfo');
const loginTotemInfo = document.getElementById('emailTotemSpanInfo');
const senhaTotemInfo = document.getElementById('senhaTotemSpanInfo');
const sistemaOperacionalTotemInfo = document.getElementById('sistemaOperacionalTotemSpanInfo');
const tipoDisco1TotemInfo = document.getElementById('tipoDisco1TotemSpanInfo');
const totalDisco1TotemInfo = document.getElementById('totalDisco1TotemSpanInfo');
const tipoDisco2TotemInfo = document.getElementById('tipoDisco2TotemSpanInfo');
const totalDisco2TotemInfo = document.getElementById('totalDisco2TotemSpanInfo');
const totalRamTotemInfo = document.getElementById('totalRamTotemSpanInfo');
const cpuTotemInfo = document.getElementById('checkboxTotemCPUInfo');
const redeTotemInfo = document.getElementById('checkboxTotemRedeInfo');
const ramTotemInfo = document.getElementById('checkboxTotemRAMInfo');
const discoTotemInfo = document.getElementById('checkboxTotemDiscoInfo');

//Numero total de totens e o total de cada componente
const numberTotal = document.getElementById('spanNumberTotal');

// Campo aonde vai ser adicionado as input do disco na tela de addTotem
const campoDisco = document.getElementById('campoDiscoP');
// Campo aonde vai ser adicionado as span dos discos na tela de editTotem
const listEditDisco = document.getElementById('listEditDiscoDiv');



/*VARIAVEIS GLOBAIS */
//Nivel de acesso
var nivelAcesso = "";

//Usadas para armanezar o valor do texto que conte as informações do totem
var nomeTotem = "";
var emailTotem = "";
var senhaTotem = "";
var sistemaOperacional = "";
var tipoDisco1 = "";
var totalDisco1 = "";
var tipoDisco2 = "";
var totalDisco2 = "";
var totalRam = "";

//Variáveis com os novos dados de um totem já existente
var novoNomeAtual = "";
var novoEmailAtual = "";
var novoSenhaAtual = "";
var novoSistemaOperacionalAtual = "";
var novoTipoDisco1Atual = "";
var novoTotalDisco1Atual = "";
var novoTipoDisco2Atual = "";
var novoTotalDisco2Atual = "";
var novoTotalRamAtual = "";

// Variáveis com os dados do novo totem
var novoNomeTotem = "";
var novoEmailTotem = "";
var novoSenhaTotem = "";
var novoSistemaOperacionalTotem = "";
var novoTipoDisco1Totem = "";
var novoTotalDisco1Totem = "";
var novoTotalRamTotem = "";


// Variáveis para saber se uma checkbox é verdadeira ou falsa e as informações do totem que o usuário deseja ver
var nomeTotemBD = "";
var loginTotemBD = "";
var senhaTotemBD = "";
var sistemaOperacionalTotemBD = "";
var tipoDiscoTotemBD = "";
var totalDiscoToteBD = "";
var totalRamTotemBD = "";
var cpuTotemBD = "";
var redeTotemBD = "";
var ramTotemBD = "";
var discoTotemBD = "";

//Variaveis com os novos valores da tela de editar
var autenticarNome = "";
var autenticarEmail = "";
var autenticarSenha = "";
var autenticarSistemaOperacional = "";
var autenticarTipoDisco1 = "";
var autenticarTotalDisco1 = "";
var autenticarTipoDisco2 = "";
var autenticarTotalDisco2 = "";
var autenticarTotalRam = "";

//Var com contagem do disco
var qtdDisco = 1;

//Vez que enviou o disco para o banco
var vezQtdDisco = 0;

// Variavel que recebe as input 
var listEditDiscoVar = "";


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


//Definir o nome do usuário e empresa
const nameUser = document.getElementById('spanNameUser');
const nameCompany = document.getElementById('spanNameCompany');
nameUser.innerHTML = `${sessionStorage.NOME_USUARIO}`;
nameCompany.innerHTML = `${sessionStorage.NOME_EMPRESA}`;




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
    listTotem.style.display = "none";
    screenAdd.style.display = "flex";
    screenEdit.style.display = "none";
    screenInfo.style.display = "none";
    bigBox.style.display = "none";
}


function abrirGerenTotem() {
    screenAdd.style.display = "none";
    listTotem.style.display = "flex";
    screenEdit.style.display = "none";
    screenInfo.style.display = "none";
    bigBox.style.display = "flex";
    location.reload();
}



// Abrir tela de editar totem
function abrirEditarTotem(idTotem) {
    listTotem.style.display = "none";
    screenEdit.style.display = "flex";
    bigBox.style.display = "none";
    screenAdd.style.display = "none";
    screenInfo.style.display = "none";
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
                    sessionStorage.SISTEMA_OPERACIONAL_TOTEM = json.sistemaOperacional;
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

                    buscarInfoTotemTotalRam(idTotem);
                });
            }
        })
        .catch(function (erro) {
            console.error("Erro ao processar requisição:", erro);
        });
}

function buscarInfoTotemTotalRam(idTotem) {
    fetch("/dashboard/buscarInfoTotemTotalRam", {
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
                    sessionStorage.TOTAL_MEDIDA = json.total;

                    buscarInfoTotemTipoDisco(idTotem);
                });
            }
        })
        .catch(function (erro) {
            console.error("Erro ao processar requisição:", erro);
        });
}

function buscarInfoTotemTipoDisco(idTotem) {
    vezQtdDisco = 0;

    fetch("/dashboard/buscarInfoTotemTipoDisco", {
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
                resposta.json().then(function (resposta) {
                    if (resposta.length > 0) {
                        for (var c = 0; c < resposta.length; c++) {
                            var disco = resposta[c];
                            vezQtdDisco++;

                            sessionStorage.setItem('IDDISCO' + vezQtdDisco, disco.iddisco)
                            sessionStorage.setItem('TIPO' + vezQtdDisco, disco.tipo);
                            sessionStorage.setItem('TOTAL' + vezQtdDisco, disco.total);


                            listEditDisco.innerHTML += `
                           <span>
                           <p id="lineEditTotemTipoDisco${vezQtdDisco}">Tipo Disco ${vezQtdDisco}º:
                               <span class="spanTotem" id="tipoDisco${vezQtdDisco}SpanTotem" value="${disco.iddisco}">${disco.tipo}</span>
                           </p>
                           <p id="lineEditTotemTotalDisco${vezQtdDisco}">Total do Disco ${vezQtdDisco}º:
                               <span class="spanTotem" id="totalDisco${vezQtdDisco}SpanTotem" value="${disco.iddisco}">${disco.total}</span>
                           </p>
                       </span>
                       </br>
                           `;
                        }
                        mostrarInformacoesscreenEdit();
                    } else {
                        console.log("Nenhum totem cadastrado.");
                        mostrarInformacoesscreenEdit();
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

function mostrarInformacoesscreenEdit() {

    var senhaMascarada = "";
    for (var i = 0; i <= sessionStorage.S_T.length; i++) {
        senhaMascarada += "*";
    }

    nomeTotemEdit.innerHTML += `${sessionStorage.NOME_TOTEM}`;
    loginTotemEdit.innerHTML += `${sessionStorage.LOGIN_TOTEM}`;
    senhaTotemEdit.innerHTML += `${senhaMascarada}`;
    sistemaOperacionalTotemEdit.innerHTML += `${sessionStorage.SISTEMA_OPERACIONAL_TOTEM}`;
    totalRamTotemEdit.innerHTML += `${sessionStorage.TOTAL_MEDIDA}`;

    if (cpuTotemBD == 1) {
        cpuTotemInfo.checked = true;

    } else {
        cpuTotemInfo.checked = false;

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

}

//Fechar tela de editar totem
function fecharEditarTotem() {
    nomeTotemEdit.innerHTML = ``;
    loginTotemEdit.innerHTML = ``;
    senhaTotemEdit.innerHTML = ``;
    sistemaOperacionalTotemEdit.innerHTML = ``;

    screenEdit.style.display = "none";
    listTotem.style.display = "flex";
    screenAdd.style.display = "none";
    screenInfo.style.display = "none";
    bigBox.style.display = "flex";
    esconderInput(false);
    location.reload();
}

// Abrir tela de informações do totem para usuário comum
function abrirInformacao(idTotem) {
    screenEdit.style.display = "none";
    listTotem.style.display = "none";
    screenAdd.style.display = "none";
    screenInfo.style.display = "flex";
    bigBox.style.display = "none";
    fetch("/dashboard/buscarInfoTotem", {
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
                    sessionStorage.NOME_TOTEM = json.nome;
                    sessionStorage.LOGIN_TOTEM = json.login;
                    sessionStorage.S_T = json.senha;
                    sessionStorage.SISTEMA_OPERACIONAL_TOTEM = json.sistemaOperacional;

                    nomeTotemInfo.innerHTML = `${sessionStorage.NOME_TOTEM}`;
                    loginTotemInfo.innerHTML = `${sessionStorage.LOGIN_TOTEM}`;
                    senhaTotemInfo.innerHTML = `${sessionStorage.S_T}`;
                    sistemaOperacionalTotemInfo.innerHTML = `${sessionStorage.SISTEMA_OPERACIONAL_TOTEM}`;

                    buscarInfoTotemComponente(idTotem);
                });
            }
        })
        .catch(function (erro) {
            console.log("Deu Erro")
            console.error("Erro ao processar requisição:", erro);
        });
}

//Fechar tela de informações do totem para usuário comum
function fecharInformacao() {
    screenEdit.style.display = "none";
    listTotem.style.display = "flex";
    screenAdd.style.display = "none";
    screenInfo.style.display = "none";
    bigBox.style.display = "flex";
}




//Troca as informações por input
function editarValores() {


    // Pegar o valor que esta na input, aqui eu pego as informações do totem
    nomeTotem = sessionStorage.NOME_TOTEM;
    loginTotem = sessionStorage.LOGIN_TOTEM;
    senhaTotem = sessionStorage.S_T;
    sistemaOperacionalTotem = sessionStorage.SISTEMA_OPERACIONAL_TOTEM;
    totalRamTotem = sessionStorage.TOTAL_MEDIDA;

    //Substituir os valores do de cada p 
    editarTotemNome.innerHTML = `Nome: <input type="text" id="inputNovoEditarTotem" placeholder="${sessionStorage.NOME_TOTEM}">`;

    editarTotemEmail.innerHTML = `Email: <input type="text" id="inputEditarEmailTotem" placeholder="${sessionStorage.LOGIN_TOTEM}">`;

    editarTotemSenha.innerHTML = `Senha: <input type="text" id="inputEditarSenhaTotem" placeholder="${sessionStorage.S_T}">`;

    editarTotemSistemaOperacional.innerHTML = `Sistema Operacional: <input type="text" id="inputEditarSistemaOperacionalTotem" placeholder="${sessionStorage.SISTEMA_OPERACIONAL_TOTEM}">`;

    editarTotemTotalRam.innerHTML = `Total memoria Ram: <input type="text" id="inputEditarTotalRamTotem" placeholder="${sessionStorage.TOTAL_MEDIDA}">`;


    document.getElementById('checkboxTotemCPU').removeAttribute('disabled');
    document.getElementById('checkboxTotemRede').removeAttribute('disabled');
    document.getElementById('checkboxTotemRAM').removeAttribute('disabled');
    document.getElementById('checkboxTotemDisco').removeAttribute('disabled');


    editarValoresDisco();
}

function editarValoresDisco() {
    listEditDisco.innerHTML = ``;

    fetch("/dashboard/buscarInfoTotemTipoDisco", {
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
                resposta.json().then(function (resposta) {
                    if (resposta.length > 0) {
                        qtdDisco = 0;
                        for (let c = 1; c <= resposta.length; c++) {
                            qtdDisco++;
                            listEditDisco.innerHTML += `
                                <span>
                                    <p>
                                        Tipo Disco ${c}º: 
                                        <input type="text" id="inputEditarTipoDisco${c}" placeholder="${sessionStorage.getItem('TIPO' + c)}">
                                    </p>
                                    <p>
                                        Total Disco ${c}º:
                                        <input type="number" id="inputEditarTotalDisco${c}" placeholder="${sessionStorage.getItem('TOTAL' + c)}">
                                    </p>
                                </span>
                            `;
                        }
                    } else {
                        console.log("Nenhum totem cadastrado.");
                        mostrarInformacoesscreenEdit();
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


function salvarDadoNovos() {
    var novoNomeTotemTab = inputNovoEditarTotem.value;
    var novoEmailTotemTab = inputEditarEmailTotem.value;
    var novoSenhaTotemTab = inputEditarSenhaTotem.value;
    var novoSistemaOperacionalTotemTab = inputEditarSistemaOperacionalTotem.value;
    var novoTotalRamTotemTab = inputEditarTotalRamTotem.value;


    //Ignorar os espaços das inputs
    novoNomeAtual = novoNomeTotemTab;
    novoEmailAtual = novoEmailTotemTab.replace(/\s/g, '');
    novoSenhaAtual = novoSenhaTotemTab.replace(/\s/g, '');
    novoSistemaOperacionalAtual = novoSistemaOperacionalTotemTab;
    novoTotalRamAtual = novoTotalRamTotemTab.replace(/\s/g, '');


    if (novoNomeAtual == "" && novoEmailAtual == "" && novoSenhaAtual == "" && novoSistemaOperacionalAtual == "" && novoTipoDisco1Atual == "" && novoTipoDisco2Atual == "" && novoTotalRamAtual == "") {
        alertMessage.innerHTML = `<img src="/img/erro.png" height="40vh"> Nenhum dado foi alterado`;
        setTimeout(function () {
            esconderAlerta();
        }, 3000);
        mostrarAlerta();
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

    mostrarAlerta();
    alertMessage.innerHTML = `<img src='/img/sinal-de-visto.png' height="50vh"> Dados alterados com sucesso!!`;
    esconderInput();

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
        editarTotemEmail.innerHTML = `Login:
        <span class="spanTotem" id="emailTotemSpan">${sessionStorage.LOGIN_TOTEM}</span>`;
        autenticarEmail = sessionStorage.LOGIN_TOTEM;
    } else {
        editarTotemEmail.innerHTML = `Login:
        <span class="spanTotem" id="emailTotemSpan">${novoEmailAtual}</span>`;
        autenticarEmail = novoEmailAtual;
    }

    if (novoSenhaAtual == "") {

        var senhaMascarada = "";
        novoSenhaAtual = sessionStorage.S_T;
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

    if (novoSistemaOperacionalAtual == "") {
        editarTotemSistemaOperacional.innerHTML = `Sistema Operacional: 
        <span class="spanTotem" id="sistemaOperacionalTotemSpan">${sessionStorage.SISTEMA_OPERACIONAL_TOTEM}</span>`;
        autenticarSistemaOperacional = sessionStorage.SISTEMA_OPERACIONAL_TOTEM;
    } else {
        editarTotemSistemaOperacional.innerHTML = `Sistema Operacional: 
        <span class="spanTotem" id="sistemaOperacionalTotemSpan">${novoSistemaOperacionalAtual}</span>`;
        autenticarSistemaOperacional = novoSistemaOperacionalAtual;
    }

    if (novoTotalRamAtual == "") {
        editarTotemTotalRam.innerHTML = `Memória Ram Total:
        <span class="spanTotem" id="totalRamTotemSpan">${sessionStorage.TOTAL_MEDIDA}`;
        autenticarTotalRam = sessionStorage.TOTAL_MEDIDA;
    } else {
        editarTotemTotalRam.innerHTML = `Memória Ram Total:
        <span class="spanTotem" id="totalRamTotemSpan">${novoTotalRamAtual}`;
        autenticarTotalRam = novoTotalRamAtual;
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
                sistemaOperacionalServer: autenticarSistemaOperacional,
                totemServer: sessionStorage.ID_TOTEM,
            })
        })

        alertMessage.innerHTML = `<img src='/img/sinal-de-visto.png' height="50vh"> Dados alterados com sucesso!!`;
        alterarTotemComponentes();
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
            totemServer: sessionStorage.ID_TOTEM,
        })
    })  
    alterarTotemRam();
}

function alterarTotemRam() {
    fetch("/dashboard/alterarTotemRam", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ramServer: autenticarTotalRam,
            totemServer: sessionStorage.ID_TOTEM,
        })
    })
    alterarDisco()
}

function alterarDisco() {
    var discoTipoBD = "";
    var discoTotalBD = "";
    var discoId = "";

    listEditDiscoVar = "";
    for (let c = 1; c <= qtdDisco; c++) {
        discoId = sessionStorage.getItem('IDDISCO' + c);
        var discoTipo = document.getElementById('inputEditarTipoDisco' + c).value;
        var discoTotal = document.getElementById('inputEditarTotalDisco' + c).value;

        if(discoTipo == null || discoTipo == "undefined" || discoTipo == ""){
         discoTipoBD = sessionStorage.getItem('TIPO' + c);
        }else{
            discoTipoBD = discoTipo;
        }
        
        if(discoTotal == null || discoTotal == "undefined" || discoTotal == ""){
            discoTotalBD = sessionStorage.getItem('TOTAL' + c);
        }else{
            discoTotalBD = discoTotal;
        }

        fetch("/dashboard/alterarTotemDisco", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idServer: discoId,
                tipoServer: discoTipoBD,
                totalServer: discoTotalBD,
                totemServer: sessionStorage.ID_TOTEM,
            })
        })

        listEditDiscoVar += `
        <span>
        <p id="lineEditTotemTipoDisco${c}">Tipo Disco ${c}º:
            <span class="spanTotem" id="tipoDisco${c}SpanTotem" value="${discoId}">${discoTipoBD}</span>
        </p>
        <p id="lineEditTotemTotalDisco${c}">Total do Disco ${c}º:
            <span class="spanTotem" id="totalDisco${c}SpanTotem" value="${discoId}">${discoTotalBD}</span>
        </p>
    </span>
    </br>
        `;

    }

    listEditDisco.innerHTML = "";
    listEditDisco.innerHTML = listEditDiscoVar;

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
    var novoSistemaOperacionalTotemTab = inputNovoSistemaOperacionalTotem.value;
    var novoTipoDisco1TotemTab = inputNovoTipoDisco1Totem.value;
    var novoTotalDisco1TotemTab = inputNovoTotalDisco1Totem.value;
    var novoTotalRamTotemTab = inputNovoTotalRamTotem.value;


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
    novoSistemaOperacionalTotem = novoSistemaOperacionalTotemTab;
    tipoDiscoTotemBD = novoTipoDisco1TotemTab.replace(/\s/g, '');
    totalDiscoToteBD = novoTotalDisco1TotemTab.replace(/\s/g, '');
    totalRamTotemBD = novoTotalRamTotemTab.replace(/\s/g, '');


    if (novoNomeTotem == "" || novoEmailTotem == "" || novoSenhaTotem == "" || novoSistemaOperacionalTotem == "" || tipoDiscoTotemBD == "" || totalRamTotemBD == "") {
        alertMessage.innerHTML = `<img src="/img/erro.png" height="40vh"> Preencha todos campos para adicionar um totem`;
        mostrarAlerta();
        setTimeout(function () {
            esconderAlerta();
        }, 3000);
    } else {

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
                sistemaOperacionalServer: novoSistemaOperacionalTotem,
            })
        })

        setTimeout(1000, addTotemComponentes());
        abrirGerenTotem();
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
    addTotemRam();
}

function addTotemRam() {
    fetch("/dashboard/cadastrarTotemRam", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            totalServer: totalRamTotemBD,
            tipoServer: 2,
        })
    })
    addTotemDisco();
}

function addTotemDisco() {
    var ultimoDisco = document.getElementById('inputNovoTipoDisco' + qtdDisco + 'Totem').value;

    if (ultimoDisco == null || ultimoDisco == undefined || ultimoDisco == "undefined" || ultimoDisco == "") {
        qtdDisco -= 1;
    }

    vezQtdDisco++;

    if (vezQtdDisco <= qtdDisco) {
        const tipoDiscoDaVez = document.getElementById('inputNovoTipoDisco' + vezQtdDisco + 'Totem').value;
        const totalDiscoDaVez = document.getElementById('inputNovoTotalDisco' + vezQtdDisco + 'Totem').value;

        tipoDiscoTotemBD = tipoDiscoDaVez;
        totalDiscoToteBD = totalDiscoDaVez;


        fetch("/dashboard/cadastrarTotemDisco", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                discoServer: tipoDiscoTotemBD,
                totalServer: totalDiscoToteBD,
            })
        })
        addTotemDisco();
    } else {

        alertMessage.innerHTML = `<img src='/img/sinal-de-visto.png' height="50vh"> Totem cadastrado com sucesso!!`;
        mostrarAlerta();
        setTimeout(function () {
            esconderAlerta();
        }, 3000);
    }



}



// Deletar totem 
function deletarTotemDecisao(idTotem) {
    alertMessage.innerHTML = `
    <div class="line">Tem certeza que deseja apagar esse totem</div>
    <div class="line">
    <button onclick="deletarTotem('${idTotem}')">Sim</button>
    <button onclick="deletarTotem('false')">Não</button>
    </div>`;
    mostrarAlerta();
}


function deletarTotem(idTotem) {
    if (idTotem == "false") {
        alertMessage.innerHTML = `<img src="/img/erro.png" height="40vh"> Cancelado`;
        
    } else {
        alertMessage.innerHTML = `<img src='/img/sinal-de-visto.png' height="50vh"> Totem deletado com sucesso`;


        fetch("/dashboard/deletarTotem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                totemServer: idTotem,
            })
        })
    }
    setTimeout(function () {
        esconderAlerta();
    }, 2000);
    
}


//Pegar os totens cadastrado na empresa e plotar eles na tela
listarTotens();
function listarTotens() {
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
                        listTotem.innerHTML = "";
                        numberTotal.innerHTML = `${resposta.length}`;
                        for (var c = 0; c < resposta.length; c++) {
                            var totem = resposta[c];
                            const listTotem = document.getElementById('listTotemDiv');

                            if (sessionStorage.TIPO_USUARIO == 1) {
                                listTotem.innerHTML += `
                            <li>
                                <p>${totem.nome}</p>
                                <span>
                                 <b class="imagemNivel1" title="Informação" onclick="abrirInformacao('${totem.idtotem}')">?</b>
                                </span>
                            </li>
                        `;
                            } else {
                                listTotem.innerHTML += `
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

function addDisco() {
    qtdDisco += 1;
    campoDisco.innerHTML += ` <p>
    <input type="text" id="inputNovoTipoDisco${qtdDisco}Totem" placeholder="Tipo do Disco ${qtdDisco}º">
    <input type="number" id="inputNovoTotalDisco${qtdDisco}Totem" placeholder="Capacidade do disco ${qtdDisco}º">
    </p>
    </br>`;
}

function mostrarAlerta() {
    alertMessage.style.right = '2%';
    alertMessage.style.opacity = '1';
}

function esconderAlerta() {
    alertMessage.style.right = '-100%';
    alertMessage.style.opacity = '0';
    listarTotens();

}

document.getElementById("btn_sair").addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "/";
});