var usuarioModel = require("../models/usuarioModel");


function validarCodigo(req, res) {
    var codigo = req.body.codigoServer;
    if (codigo == undefined) {
        res.status(400).send("Seu Codigo está undefined!");
    } else {

        usuarioModel.validarCodigo(codigo)
            .then(
                function (resultadovalidarCodigo) {
                    if (resultadovalidarCodigo.length == 1) {
                        res.json({
                            empresa: resultadovalidarCodigo[0].id,
                        });
                    } else {
                        res.status(403).send("codigo inválido");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao tentar validar o codigo! Erro:", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}



function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var empresa = req.body.empresaServer;

    if (nome == undefined || email == undefined || senha == undefined || empresa == undefined) {
        res.status(400).send("Algum dado está indefinido!");
    }
    
    usuarioModel.cadastrar(nome, email, senha, empresa).then(function(resposta){
        res.status(200).send("Empresa cadastrada com sucesso");
    }).catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    })
}


module.exports = {
    validarCodigo,
    cadastrar,
}
