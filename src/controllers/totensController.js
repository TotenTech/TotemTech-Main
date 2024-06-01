const totensModel = require("../models/totensModel");

function getAllTotens(req, res) {
  const idCompany = req.params.empresaUsuario;

  totensModel.getAllTotens(idCompany)
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(204).json([]);
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Erro ao executar: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function getComponentLastData(req, res) {
  const idCompany = req.params.empresaUsuario;
  const component = req.params.componente;

  totensModel.getComponentLastData(idCompany, component)
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(204).json([]);
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Erro ao executar: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  getAllTotens,
  getComponentLastData
}