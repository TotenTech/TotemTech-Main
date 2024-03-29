
var usuarioModel = require("../models/cadastroModel");
    
function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var codigo = req.body.codigoServer;

    if (nome == undefined || email == undefined || senha == undefined || codigo == undefined) {
        res.status(400).send("Algum dado está indefinid!");
    }
    usuarioModel.cadastrar(nome, email, senha, codigo).then(function(resposta) {
        res.status(200).send("Usuario cadastrado com sucesso");
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    cadastrar,
}
