var dashboardModel = require("../models/dashboardModel");


function cadastrarTotem(req, res) {
    var nome = req.body.nomeServer;
    var login = req.body.loginServer;
    var senha = req.body.senhaServer;
    var empresa = req.body.empresaServer;
    var sistemaOperacional = req.body.sistemaOperacionalServer;

    if (nome == undefined ||
        login == undefined ||
        senha == undefined ||
        empresa == undefined ||
        sistemaOperacional == undefined) {
        res.status(400).send("Algum dado está undefined!");
    } else {
        dashboardModel.cadastrarTotem(nome, login, senha, sistemaOperacional, empresa)
            .then(function (resposta) {
                res.status(200).send("Totem cadastrado com sucesso");
            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            })
    }
}

function cadastrarTotemComponetes(req, res) {
    var cpu = req.body.cpuServer;
    var rede = req.body.redeServer;
    var ram = req.body.ramServer;
    var disco = req.body.discoServer

    if (cpu == undefined ||
        rede == undefined ||
        ram == undefined ||
        disco == undefined) {
        res.status(400).send("Algum dado está undefined!");
    } else {
        dashboardModel.cadastrarTotemComponetes(cpu, rede, ram, disco)
            .then(function (resposta) {
                res.status(200).send("Componentes do totem cadastrado com sucesso");
            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            })
    }
}

function listarTotens(req, res) {
    var empresa = req.body.empresaServer

    dashboardModel.listarTotens(empresa).then(function (resposta) {
        res.status(200).send(resposta);

    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    })
}


function deletarTotemVisualizacao(req, res) {
    var totem = req.body.totemServer;

    if (totem == undefined) {
        res.status(400).send("Algum dado está undefined!");
    } else {
        dashboardModel.deletarTotemVisualizacao(totem)
            .then(function (resposta) {
                res.status(200).send("Sucesso em deletar as visualizações do totem");

            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            })
    }
}


function deletarTotem(req, res) {
    var totem = req.body.totemServer;

    if (totem == undefined) {
        res.status(400).send("Algum dado está undefined!");
    } else {
        dashboardModel.deletarTotem(totem)
            .then(function (resposta) {
                res.status(200).send("Sucesso em deletar as visualizações do totem");

            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            })
    }
}

function alterarTotem(req, res) {
    var nome = req.body.nomeServer;
    var login = req.body.loginServer;
    var senha = req.body.senhaServer;
    var sistemaOperacional = req.body.sistemaOperacionalServer;
    var totem = req.body.totemServer;

    if (nome == undefined ||
        login == undefined ||
        senha == undefined ||
        sistemaOperacional == undefined ||
        totem == undefined) {
        res.status(400).send("Algum dado está undefined!");
    } else {
        dashboardModel.alterarTotem(nome, login, senha, sistemaOperacional, totem)
            .then(function (resposta) {
                res.status(200).send("Alteração feita com sucesso!");

            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            })
    }
}

function alterarTotemComponente(req, res) {
    var cpu = req.body.cpuServer;
    var rede = req.body.redeServer;
    var memoria = req.body.ramServer;
    var disco = req.body.discoServer;
    var totem = req.body.totemServer;

    if (cpu == undefined ||
        rede == undefined ||
        memoria == undefined ||
        disco == undefined ||
        totem == undefined) {
        res.status(400).send("Algum dado está undefined!");
    } else {
        dashboardModel.alterarTotemComponente(cpu, rede, memoria, disco, totem)
            .then(function (resposta) {
                res.status(200).send("Alteração feita com sucesso!");

            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            })
    }
}


function buscarInfoTotem(req, res) {
    var totem = req.body.totemServer;
    if (totem == undefined) {
        res.status(400).send("Seu totem está undefined!");
    } else {

        dashboardModel.buscarInfoTotem(totem)
            .then(
                function (resultadoAutenticar) {
                    if (resultadoAutenticar.length == 1) {
                        res.json({
                            nome: resultadoAutenticar[0].nome,
                            login: resultadoAutenticar[0].login,
                            senha: resultadoAutenticar[0].senha,
                            sistemaOperacional: resultadoAutenticar[0].sistemaOperacional,
                        });
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar buscar! Erro:", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function buscarInfoTotemComponente(req, res) {
    var totem = req.body.totemServer;
    if (totem == undefined) {
        res.status(400).send("Seu totem está undefined!");
    } else {

        dashboardModel.buscarInfoTotemComponente(totem)
            .then(
                function (resultadoAutenticar) {
                    if (resultadoAutenticar.length == 1) {
                        res.json({
                            cpu: resultadoAutenticar[0].cpu,
                            memoria: resultadoAutenticar[0].memoria,
                            disco: resultadoAutenticar[0].disco,
                            rede: resultadoAutenticar[0].rede,
                        });
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar buscar! Erro:", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


module.exports = {
    cadastrarTotem,
    cadastrarTotemComponetes,
    listarTotens,
    deletarTotemVisualizacao,
    deletarTotem,
    alterarTotem,
    alterarTotemComponente,
    buscarInfoTotem,
    buscarInfoTotemComponente,
}