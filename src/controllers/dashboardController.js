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

function cadastrarTotemRam(req, res) {
    var total = req.body.totalServer;
    var tipoComponente = req.body.tipoServer;

    if (total == undefined) {
        res.status(400).send("Algum dado está undefined!");
    } else {
        dashboardModel.cadastrarTotemRam(total, tipoComponente)
            .then(function (resposta) {
                res.status(200).send("Componentes do totem cadastrado com sucesso");
            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            })
    }
}

function cadastrarTotemDisco(req, res) {
    var disco = req.body.discoServer;
    var total = req.body.totalServer;

    if (disco == undefined || total == undefined) {
        res.status(400).send("Algum dado está undefined!");
    } else {
        dashboardModel.cadastrarTotemDisco(disco, total)
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

function alterarTotemRam(req, res) {
    var ram = req.body.ramServer;
    var totem = req.body.totemServer;

    if (ram == undefined ||
        totem == undefined) {
        res.status(400).send("Algum dado está undefined!");
    } else {
        dashboardModel.alterarTotemRam(ram, totem)
            .then(function (resposta) {
                res.status(200).send("Alteração feita com sucesso!");

            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            })
    }
}

function alterarTotemDisco(req, res) {
    var id = req.body.idServer;
    var total = req.body.totalServer;
    var tipo = req.body.tipoServer;
    var totem = req.body.totemServer;

    if (totem == undefined ||
        total == undefined ||
        tipo == undefined ||
        id == undefined) {
        res.status(400).send("Algum dado está undefined!");
    } else {
            dashboardModel.alterarTotemDisco(id, total, tipo, totem)
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


function buscarInfoTotemTotalRam(req, res) {
    var totem = req.body.totemServer;
    if (totem == undefined) {
        res.status(400).send("Seu totem está undefined!");
    } else {

        dashboardModel.buscarInfoTotemTotalRam(totem)
            .then(
                function (resultadoAutenticar) {
                    if (resultadoAutenticar.length == 1) {
                        res.json({
                            total: resultadoAutenticar[0].total,
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

function buscarInfoTotemTipoDisco(req, res) {
    var totem = req.body.totemServer;
    if (totem == undefined) {
        res.status(400).send("Seu totem está undefined!");
    } else {

        dashboardModel.buscarInfoTotemTipoDisco(totem).then(function (resposta) {
            res.status(200).send(resposta);
    
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        })
    }
}

// Controlador para inserir uma nova interrupção


function buscarInterrupcoes(req, res) {
    dashboardModel.buscarInterrupcoes().then(function (resposta) {
        res.status(200).send(resposta);
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}
// Controlador para contar o número total de interrupções
function contarInterrupcoes(req, res) {
    dashboardModel.contarInterrupcoes().then(function (resposta) {
        res.status(200).send(resposta);
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function cadastrarUsuario(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var nivelAcesso = req.body.nivelAcessoServer;
    var empresa = req.body.empresaServer;

    if (nome == undefined ||
        email == undefined ||
        senha == undefined ||
        empresa == undefined ||
        nivelAcesso == undefined) {
        res.status(400).send("Algum dado está undefined!");
    } else {
        dashboardModel.cadastrarUsuario(nome, email, senha, empresa, nivelAcesso)
            .then(function (resposta) {
                res.status(200).send("Usuário cadastrado com sucesso");
            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            })
    }
}

function listarUsuarios(req, res) {
    var empresa = req.body.empresaServer

    dashboardModel.listarUsuarios(empresa).then(function (resposta) {
        res.status(200).send(resposta);

    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    })
}

function buscarInfoUsuario(req, res) {
    var id = req.body.idServer;
    if (id == undefined) {
        res.status(400).send("Seu usuario está undefined!");
    } else {

        dashboardModel.buscarInfoUsuario(id)
            .then(
                function (resultadoAutenticar) {
                    if (resultadoAutenticar.length == 1) {
                        res.json({
                            nome: resultadoAutenticar[0].nome,
                            email: resultadoAutenticar[0].email,
                            senha: resultadoAutenticar[0].senha,
                            tipo: resultadoAutenticar[0].tipo,
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

function deletarUsuario(req, res) {
    var id = req.body.idServer;

    if (id == undefined) {
        res.status(400).send("Algum dado está undefined!");
    } else {
        dashboardModel.deletarUsuario(id)
            .then(function (resposta) {
                res.status(200).send("Sucesso em deletar as visualizações do usuário");

            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            })
    }
}


function editarUsuario(req, res) {
    var id = req.body.idServer;
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var tipo = req.body.tipoServer;

    if (id == undefined || nome == undefined || email == undefined || senha == undefined || tipo == undefined) {
        res.status(400).send("Algum dado está undefined!");
    } else {
        dashboardModel.editarUsuario(id, nome, email, senha, tipo)
            .then(function (resposta) {
                res.status(200).send("Sucesso em alterar os dados do usuário");

            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            })
    }
}



module.exports = {
    cadastrarTotem,
    cadastrarTotemComponetes,
    cadastrarTotemRam,
    cadastrarTotemDisco,
    listarTotens,
    deletarTotem,
    alterarTotem,
    alterarTotemComponente,
    alterarTotemRam,
    alterarTotemDisco,
    buscarInfoTotem,
    buscarInfoTotemComponente,
    buscarInfoTotemTotalRam,
    buscarInfoTotemTipoDisco,
    buscarInterrupcoes,
    contarInterrupcoes,
    cadastrarUsuario,
    listarUsuarios,
    buscarInfoUsuario,
    deletarUsuario,
    editarUsuario,
}