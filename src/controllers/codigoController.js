
var codigoModel = require("../models/codigoModel");


function validarCodigo(req, res) {
    var codigo = req.body.codigoServer;

    if (codigo == undefined) {
        res.status(400).send("Seu Codigo está undefined!");
    } else {
        
        codigoModel.validarCodigo(codigo)
        .then(
            function (resultadovalidarCodigo){
                if (resultadovalidarCodigo.length == 1) {
                    console.log(resultadovalidarCodigo);
                res.json({
                    codigo: resultadovalidarCodigo[0].codigo,
                                });    
                } else if(resultadovalidarCodigo.length == 0){
                res.status(403).send("codigo inválido");
            } else {
                res.status(403).send("Mais de um usuario com o mesmo login e senha!");
            }
        }
        ).catch(
            function (erro){
                console.log(erro);
                console.log("\nHouve um erro ao tentar validar o codigo! Erro:", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
        }
    }

module.exports = {
    validarCodigo
}
