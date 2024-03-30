var express = require("express");
var router = express.Router();

var codigoController = require("../controllers/codigoController");

router.post("/validarCodigo", function (req, res) {
    codigoController.validarCodigo(req, res);
    console.log('teste apareceu');
});


module.exports = router;