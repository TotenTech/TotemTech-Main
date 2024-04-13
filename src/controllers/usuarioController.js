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
    var nivelAcesso = req.body.nivelAcessoServer;

    if (nome == undefined || email == undefined || senha == undefined || empresa == undefined || nivelAcesso == undefined) {
        res.status(400).send("Algum dado está indefinido!");
    }
    usuarioModel.cadastrar(nome, email, senha, empresa, nivelAcesso).then(function(resposta){
        res.status(200).send("Empresa cadastrada com sucesso");
    }).catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    })
}


function verificarLogin(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu emai está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        
        usuarioModel.verificarLogin(email, senha)    
        .then(
            function (resultadoAutenticar){
                if (resultadoAutenticar.length == 1) {
                res.json({
                    id: resultadoAutenticar[0].id,
                    nome: resultadoAutenticar[0].nome,
                    email: resultadoAutenticar[0].email,
                    senha: resultadoAutenticar[0].senha,
                    empresa: resultadoAutenticar[0].empresa,
                    nivelAcesso: resultadoAutenticar[0].nivelAcesso,
                                });    
                } else if(resultadoAutenticar.length == 0){
                res.status(403).send("Email e/ou senha inválido(s)");
            } else {
                res.status(403).send("Mais de um usuario com o mesmo login e senha!");
            }
        }
        ).catch(
            function (erro){
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro:", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
        }
    }

module.exports = {
    validarCodigo,
    cadastrar,
    verificarLogin,
}
