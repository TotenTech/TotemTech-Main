

window.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.ID_USUARIO == undefined) {
        window.location.href = "/erro";
    }
})


// Definir telas disponiveis por nivel de acesso
if (sessionStorage.TIPO_USUARIO == "1") {
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
const bigBox = document.getElementById('bigBoxDiv');


//Pegar o id das linhas que contém o texto e span
const editarTotemNome = document.getElementById("lineEditTotemNome");
const editarTotemEmail = document.getElementById("lineEditTotemEmail");
const editarTotemSenha = document.getElementById("lineEditTotemSenha");
const editarTotemSistemaOperacional = document.getElementById("lineEditTotemSistemaOperacional");
const editarTotemTotalRam = document.getElementById("lineEditTotemTotalRam");
const editarTotemTipoRam = document.getElementById('lineEditTotemTipoRam');

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
const tipoRamTotemEdit = document.getElementById('tipoRamSpanTotem')
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
const tipoRamTotemInfo = document.getElementById('tipoRamTotemSpanInfo');
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


//Var com contagem do disco
var qtdDisco = 1;

//Vez que enviou o disco para o banco
var vezQtdDisco = 0;

// Variaveis com informações dos totens
var NomeTotem = "";
var EmailTotem = "";
var SenhaTotem = "";
var SistemaOperacionalTotem = "";
var TipoDisco1Totem = "";
var TotalDisco1Totem = "";
var TotalRamTotem = "";
var TipoRamTotem = "";

//Variaveis de visualização de componentes 
var cpu = 0;
var rede = 0;
var disco = 0;
var ram = 0;

// Variavel com total de disco
var totalDisco = 1;
var contador = 0;

// Soma dos valores de Disco 
var totalDisco = 0;

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
    bigBox.style.display = "none";
}


function abrirGerenTotem() {
    screenAdd.style.display = "none";
    screenEdit.style.display = "none";
    bigBox.style.display = "flex";
    location.reload();
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


// Criar o cadastro de um totem novo
function addTotem() {
    var cpuC = document.getElementById('checkboxCPU');
    var redeC = document.getElementById('checkboxRede');
    var ramC = document.getElementById('checkboxRAM');
    var discoC = document.getElementById('checkboxDisco');
    var cpu = 0;
    var rede = 0;
    var disco = 0;
    var ram = 0;
    NomeTotem = inputNovoNomeTotem.value;
    EmailTotem = inputNovoEmailTotem.value;
    SenhaTotem = inputNovoSenhaTotem.value;
    SistemaOperacionalTotem = inputNovoSistemaOperacionalTotem.value;
    TipoDisco1Totem = inputNovoTipoDisco1Totem.value;
    TotalDisco1Totem = inputNovoTotalDisco1Totem.value;
    TotalRamTotem = inputNovoTotalRamTotem.value;
    TipoRamTotem = inputNovoTipoRamTotem.value;


    if (cpuC.checked) {
        cpu = 1;
    }

    if (redeC.checked) {
        rede = 1;
    }

    if (ramC.checked) {
        ram = 1;
    }

    if (discoC.checked) {
        disco = 1;
    }

    if (NomeTotem == "" ||
        EmailTotem == "" ||
        SenhaTotem == "" ||
        SistemaOperacionalTotem == "" ||
        TipoDisco1Totem == "" ||
        TotalDisco1Totem == "" ||
        TotalRamTotem == "" ||
        TipoRamTotem == ""
    ) {
        abrirGerenTotem()
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
                nomeServer: NomeTotem,
                loginServer: EmailTotem,
                senhaServer: SenhaTotem,
                empresaServer: sessionStorage.EMPRESA_USUARIO,
                sistemaOperacionalServer: SistemaOperacionalTotem,
            })
        })
        setTimeout(1000, addTotemVisualizacao(cpu, rede, ram, disco));
    }
}

function addTotemVisualizacao(cpu, rede, ram, disco) {
    //Cadastrar componentes totem

    fetch("/dashboard/cadastrarTotemComponetes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cpuServer: cpu,
            redeServer: rede,
            ramServer: ram,
            discoServer: disco,
        })
    })
    addComponentesTotem();
}

function addComponentesTotem() {
    var nomeComponente = TipoRamTotem;
    var nome1 = "maximo";
    var valor1 = "89.0";
    var unidadeMedida1 = "%";
    var nome2 = "total";
    var valor2 = TotalRamTotem;
    var unidadeMedida2 = "GB";
    var nomeComponenteCPU = "Intel i7";
    var valorCPU = "90.0";
    var unidadeMedidaCPU = "%";
    var nomeComponenteRede = "Net Claro";
    var nomeEspecificacao1Rede = "minimo";
    var valorEspecificacao1Rede = "5.0";
    var unidadeMedidaEspecificacao1Rede = "MB/s";
    var nomeEspecificacao2Rede = "ideal";
    var valorEspecificacao2Rede = "10.0";
    var unidadeMedidaEspecificacao2Rede = "MB/s";
    totalDisco = 0;
    
    
    fetch("/dashboard/cadastrarComponentesTotem", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeComponenteServer: nomeComponente,
            nome1Server: nome1,
            valor1Server: valor1,
            unidadeMedida1Server: unidadeMedida1,
            nome2Server: nome2,
            valor2Server: valor2,
            unidadeMedida2Server: unidadeMedida2,
            nomeComponenteCPUServer: nomeComponenteCPU,
            valorCPUServer: valorCPU,
            unidadeMedidaCPUServer: unidadeMedidaCPU,
            nomeComponenteRedeServer: nomeComponenteRede,
            nomeEspecificacao1RedeServer: nomeEspecificacao1Rede,
            valorEspecificacao1RedeServer: valorEspecificacao1Rede,
            unidadeMedidaEspecificacao1RedeServer: unidadeMedidaEspecificacao1Rede,
            nomeEspecificacao2RedeServer: nomeEspecificacao2Rede,
            valorEspecificacao2RedeServer: valorEspecificacao2Rede,
            unidadeMedidaEspecificacao2RedeServer: unidadeMedidaEspecificacao2Rede,
        })
    });
    
    addDiscoTotem();
}



function addDiscoTotem() {
    var nomeComponente = "";
    var nome1 = "maximo";
    var valor1 = "90.0";
    var unidadeMedida1 = "%";
    var nome2 = "total";
    var valor2 = "";
    var unidadeMedida2 = "GB";

    var ultimoDisco = document.getElementById('inputNovoTipoDisco' + qtdDisco + 'Totem').value;

    if (ultimoDisco == null || ultimoDisco == undefined || ultimoDisco == "undefined" || ultimoDisco == "") {
        qtdDisco -= 1;
    }

    vezQtdDisco++;

    if (vezQtdDisco <= qtdDisco) {
        const tipoDiscoDaVez = document.getElementById('inputNovoTipoDisco' + vezQtdDisco + 'Totem').value;
        const totalDiscoDaVez = document.getElementById('inputNovoTotalDisco' + vezQtdDisco + 'Totem').value;

        nomeComponente = tipoDiscoDaVez;
        valor2 = totalDiscoDaVez;
        totalDisco+= parseInt(totalDiscoDaVez, 10);

        fetch("/dashboard/cadastrarComponentesTotemDisco", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeComponenteServer: nomeComponente,
                nome1Server: nome1,
                valor1Server: valor1,
                unidadeMedida1Server: unidadeMedida1,
                nome2Server: nome2,
                valor2Server: valor2,
                unidadeMedida2Server: unidadeMedida2,
            })
        });
        addDiscoTotem();
    } else {
        addTotalDiscoTotem();
        alertMessage.innerHTML = `<img src='/img/sinal-de-visto.png' height="50vh"> Totem cadastrado com sucesso!!`;
        mostrarAlerta();
        setTimeout(function () {
            abrirGerenTotem();
        }, 2000);
    }
}

function addTotalDiscoTotem(){
    fetch("/dashboard/cadastrarTotalDiscoTotem", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            totalDiscoServer: totalDisco,
        })
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

// Abrir tela de editar totem
function abrirEditarTotem(idTotem) {
    listTotem.style.display = "none";
    screenEdit.style.display = "flex";
    bigBox.style.display = "none";
    screenAdd.style.display = "none";
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
                    cpu = json.cpu;
                    ram = json.memoria;
                    disco = json.disco;
                    rede = json.rede;

                    buscarInfoTotem(idTotem);
                });
            }
        })
        .catch(function (erro) {
            console.error("Erro ao processar requisição:", erro);
        });
}

function buscarInfoTotem(idTotem) {
    fetch("/dashboard/buscarInfoComponente", {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            idTotemServer: idTotem,
        })
    })
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    if (resposta.length > 0) {
                        var qtdDisco = 1;
                        contador = 1;
                        for (var c = 0; c < resposta.length; c++) {
                            var componente = resposta[c];
                            totalDisco = 1;
                            if (componente.tipo == 2) {
                                sessionStorage.RAM_TIPO_COMPONENTE = componente.nome;
                                sessionStorage.RAM_ID_COMPONENTE = componente.idcomponente;
                            } else if (componente.tipo == 3) {
                                sessionStorage.setItem('DISCO' + qtdDisco + '_ID_COMPONENTE', componente.idcomponente);
                                mostrarEspecificacaoDisco(componente.idcomponente);
                                qtdDisco++;
                                totalDisco++;
                            }
                        }
                        buscarInfoEspecificacao(idTotem);
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

function buscarInfoEspecificacao(idTotem) {

    listEditDisco.innerHTML = "";
    contador = 1;
    fetch("/dashboard/buscarInfoEspecificacao", {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            idtotemServer: idTotem,
        })
    })
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    if (resposta.length > 0) {
                        var qtdDisco = 1;
                        for (var c = 0; c < resposta.length; c++) {
                            var especificacao = resposta[c];

                            if (especificacao.nome == "total" && especificacao.tipo == 3) {
                                qtdDisco++;
                            } else if (especificacao.nome == "total" && especificacao.tipo == 2) {
                                sessionStorage.RAM_ID_ESPECIFICACAO = especificacao.idespecificacao;
                                sessionStorage.RAM_VALOR_COMPONENTE = especificacao.valor;
                            }

                        }

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
    sessionStorage.ID_TOTEM = idTotem;
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
    totalRamTotemEdit.innerHTML += `${sessionStorage.RAM_VALOR_COMPONENTE}`;
    tipoRamTotemEdit.innerHTML += `${sessionStorage.RAM_TIPO_COMPONENTE}`;

    if (cpu == 1) {
        cpuTotemInfo.checked = true;

    } else {
        cpuTotemInfo.checked = false;

    }
    if (ram == 1) {
        ramTotemInfo.checked = true;

    } else {
        ramTotemInfo.checked = false;
    }
    if (disco == 1) {
        discoTotemInfo.checked = true;

    } else {
        discoTotemInfo.checked = false;

    }
    if (rede == 1) {
        redeTotemInfo.checked = true;

    } else {
        redeTotemInfo.checked = false;

    }

    if (cpu == 1) {
        cpuTotemEdit.checked = true;

    } else {
        cpuTotemEdit.checked = false;
    }
    if (ram == 1) {
        ramTotemEdit.checked = true;

    } else {
        ramTotemEdit.checked = false;

    }
    if (disco == 1) {
        discoTotemEdit.checked = true;

    } else {
        discoTotemEdit.checked = false;

    }
    if (rede == 1) {
        redeTotemEdit.checked = true;

    } else {
        redeTotemEdit.checked = false;
    }

}


function mostrarEspecificacaoDisco(idcomponente) {
    fetch("/dashboard/buscarEspecificacaoComponente", {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            idcomponenteServer: idcomponente,
        })
    })
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(json => {
                    sessionStorage.setItem('DISCO' + contador + '_ID_COMPONENTE', json[0].idcomponente);
                    sessionStorage.setItem('DISCO' + contador + '_TIPO_COMPONENTE', json[0].NomeComponente);
                    sessionStorage.setItem('DISCO' + contador + '_ID_ESPECIFICACAO', json[0].idespecificacao);
                    sessionStorage.setItem('DISCO' + contador + '_VALOR_ESPECIFICACAO', json[0].valor);

                    listEditDisco.innerHTML += `
                <span>
                <p id="lineEditTotemTipoDisco${contador}">Tipo Disco ${contador}º:
                    <span class="spanTotem" id="tipoDisco${contador}SpanTotem" value="${json[0].NomeComponente}">${json[0].NomeComponente}</span>
                </p>
                <p id="lineEditTotemTotalDisco${contador}">Total do Disco ${contador}º:
                    <span class="spanTotem" id="totalDisco${contador}SpanTotem" value="${json[0].valor}">${json[0].valor}</span>
                </p>
            </span>
        
           </br>
               `;
                    contador++;
                });
            }
        })

        .catch(function (erro) {
            console.error("Erro ao processar requisição:", erro);
        });

}


//Fechar tela de editar totem
function fecharEditarTotem() {
    nomeTotemEdit.innerHTML = ``;
    loginTotemEdit.innerHTML = ``;
    senhaTotemEdit.innerHTML = ``;
    sistemaOperacionalTotemEdit.innerHTML = ``;
    sistemaOperacionalTotemEdit.innerHTML = ``;

    screenEdit.style.display = "none";
    listTotem.style.display = "flex";
    screenAdd.style.display = "none";
    bigBox.style.display = "flex";
    // esconderInput(false);
    location.reload();
}



//Troca as informações por input
function editarValores() {
    // Pegar o valor que esta na input, aqui eu pego as informações do totem
    nomeTotem = sessionStorage.NOME_TOTEM;
    loginTotem = sessionStorage.LOGIN_TOTEM;
    senhaTotem = sessionStorage.S_T;
    sistemaOperacionalTotem = sessionStorage.SISTEMA_OPERACIONAL_TOTEM;
    totalRamTotem = sessionStorage.TOTAL_MEDIDA;
    tipoRamTotem = sessionStorage.TIPO_RAM_MEDIDA;

    //Substituir os valores do de cada p 
    editarTotemNome.innerHTML = `Nome: <input type="text" id="inputEditarNomeTotem" value="${sessionStorage.NOME_TOTEM}">`;

    editarTotemEmail.innerHTML = `Email: <input type="text" id="inputEditarEmailTotem" value="${sessionStorage.LOGIN_TOTEM}">`;

    editarTotemSenha.innerHTML = `Senha: <input type="text" id="inputEditarSenhaTotem" value="${sessionStorage.S_T}">`;

    editarTotemSistemaOperacional.innerHTML = `Sistema Operacional: <input type="text" id="inputEditarSistemaOperacionalTotem" value="${sessionStorage.SISTEMA_OPERACIONAL_TOTEM}">`;

    editarTotemTotalRam.innerHTML = `Total memoria Ram: <input type="text" id="inputEditarTotalRamTotem" value="${sessionStorage.RAM_VALOR_COMPONENTE}">`;

    editarTotemTipoRam.innerHTML = `Tipo memoria Ram: <input type="text" id="inputEditarTipoRamTotem" value="${sessionStorage.RAM_TIPO_COMPONENTE}">`


    document.getElementById('checkboxTotemCPU').removeAttribute('disabled');
    document.getElementById('checkboxTotemRede').removeAttribute('disabled');
    document.getElementById('checkboxTotemRAM').removeAttribute('disabled');
    document.getElementById('checkboxTotemDisco').removeAttribute('disabled');


    editarValoresDisco();
}


function editarValoresDisco() {
    listEditDisco.innerHTML = ``;

    fetch("/dashboard/buscarInfoEspecificacao", {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            idtotemServer: sessionStorage.ID_TOTEM,
        })
    })
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    if (resposta.length > 0) {
                        qtdDisco = 0;
                        for (let c = 1; c <= resposta.length; c++) {
                            var especificacao = resposta[c];


                            if (especificacao.nome == "total" && especificacao.tipo == 3) {
                                qtdDisco++;

                                listEditDisco.innerHTML += `
                                <span>
                                    <p>
                                        Tipo Disco ${qtdDisco}º: 
                                        <input type="text" id="inputEditarTipoDisco${qtdDisco}" value="${sessionStorage.getItem('DISCO' + qtdDisco + '_TIPO_COMPONENTE')}">
                                    </p>
                                    <p>
                                        Total Disco ${qtdDisco}º:
                                        <input type="number" id="inputEditarTotalDisco${qtdDisco}" value="${sessionStorage.getItem('DISCO' + qtdDisco + '_VALOR_ESPECIFICACAO')}">
                                    </p>
                                </span>
                            `;
                            }
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

function updateVisualizacao() {

    if (cpuTotemEdit.checked) {
        cpu = 1;
    } else {
        cpu = 0;
    }
    if (redeTotemEdit.checked) {
        rede = 1;
    } else {
        rede = 0;
    }
    if (ramTotemEdit.checked) {
        ram = 1;
    } else {
        ram = 0;
    }
    if (discoTotemEdit.checked) {
        disco = 1;
    } else {
        disco = 0;
    }

    mostrarAlerta();
    alertMessage.innerHTML = `<img src='/img/sinal-de-visto.png' height="50vh"> Dados alterados com sucesso!!`;

    fetch("/dashboard/alterarTotemComponente", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cpuServer: cpu,
            redeServer: rede,
            ramServer: ram,
            discoServer: disco,
            totemServer: sessionStorage.ID_TOTEM,
        })
    })

    updateTotem();
}

function updateTotem() {
    var nome = inputEditarNomeTotem.value;
    var email = inputEditarEmailTotem.value;
    var senha = inputEditarSenhaTotem.value;
    var sistemaOperacional = inputEditarSistemaOperacionalTotem.value;

    var ramTipo = inputEditarTipoRamTotem.value;
    var ramValor = inputEditarTotalRamTotem.value;

    fetch("/dashboard/alterarTotem", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nome,
            loginServer: email,
            senhaServer: senha,
            sistemaOperacionalServer: sistemaOperacional,
            totemServer: sessionStorage.ID_TOTEM,
        })
    })

    updateComponenteEspecificacao(sessionStorage.RAM_ID_COMPONENTE,
        ramTipo,
        sessionStorage.RAM_ID_ESPECIFICACAO,
        ramValor
    )
    direcionadorDisco()

}

function direcionadorDisco() {
    for (let c = 1; c <= qtdDisco; c++) {
        setTimeout(function () {
            updateComponenteEspecificacao(
                sessionStorage.getItem('DISCO' + c + '_ID_COMPONENTE'),
                document.getElementById(`inputEditarTipoDisco${c}`).value,
                sessionStorage.getItem('DISCO' + c + '_ID_ESPECIFICACAO'),
                document.getElementById(`inputEditarTotalDisco${c}`).value
            );
        }, c * 100);
    }
    esconderInput();

}

function updateComponenteEspecificacao(idcomponente,
    tipoComponente,
    idespecificacao,
    valorEspecificacao
) {


    fetch("/dashboard/alterarComponenteEspecificacao", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idcomponenteServer: idcomponente,
            tipoComponenteServer: tipoComponente,
            idespecificacaoServer: idespecificacao,
            valorEspecificacaoServer: valorEspecificacao,
        })
    })
}

function esconderInput() {
    var novoNomeTotem = inputEditarNomeTotem.value;
    var novoEmailTotem = inputEditarEmailTotem.value;
    var novoSenhaTotem = inputEditarSenhaTotem.value;
    var novoSistemaOperacionalTotem = inputEditarSistemaOperacionalTotem.value;
    var novoTipoRamTotem = inputEditarTipoRamTotem.value;
    var novoTotalRamTotem = inputEditarTotalRamTotem.value;

    if (novoNomeTotem == "" && novoEmailTotem == "" && novoSenhaTotem == "" && novoSistemaOperacionalTotem == "" && novoTipoDisco1Atual == "" && novoTipoRamTotem == "" && novoTotalRamTotem == "") {
        alertMessage.innerHTML = `<img src="/img/erro.png" height="40vh"> Nenhum campo foi alterado foi alterado`;
        setTimeout(function () {
            esconderAlerta();
        }, 3000);
        mostrarAlerta();
    } else {
        editarTotemNome.innerHTML = `Nome: 
        <span class="spanTotem" id="nomeTotemSpan">${novoNomeTotem}</span>`;

        editarTotemEmail.innerHTML = `Login:
        <span class="spanTotem" id="emailTotemSpan">${novoEmailTotem}</span>`;

        var senhaMascarada = "";
        for (var i = 0; i <= novoSenhaTotem.length; i++) {
            senhaMascarada += "*";
        }

        editarTotemSenha.innerHTML = `Senha: 
        <span class="spanTotem" id="senhaTotemSpan">${senhaMascarada}</span>`;

        editarTotemSistemaOperacional.innerHTML = `Sistema Operacional: 
        <span class="spanTotem" id="sistemaOperacionalTotemSpan">${novoSistemaOperacionalTotem}</span>`;

        editarTotemTipoRam.innerHTML = `Memória Ram Tipo:
        <span class="spanTotem" id= "tipoRamTotemSpan">${novoTipoRamTotem}</span>`;

        editarTotemTotalRam.innerHTML = `Memória Ram Total:
        <span class="spanTotem" id="totalRamTotemSpan">${novoTotalRamTotem}`;


    }

    mostrarEspecificacaoDisco();

    alertMessage.innerHTML = `<img src='/img/sinal-de-visto.png' height="50vh"> Dados alterados com sucesso!!`;
    mostrarAlerta();
    setTimeout(function () {
        esconderAlerta();
    }, 3000);

}

function abrirInformacao(idTotem) {
    listTotem.style.display = "none";
    screenEdit.style.display = "flex";
    bigBox.style.display = "none";
    screenAdd.style.display = "none";
    sessionStorage.ID_TOTEM = idTotem;

    const lineButton = document.getElementById("lineButtonDiv");
    lineButton.style.display= "none";

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
                    buscarInfoTotemComponente(idTotem);
                });
            }
        })
        .catch(function (erro) {
            console.error("Erro ao processar requisição:", erro);
        });
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
})