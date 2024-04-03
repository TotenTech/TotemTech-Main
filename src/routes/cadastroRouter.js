const express = require("express");
const router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", (req, res) => {
    res.render("cadastro");
})


router.post("/validarCodigo", function (req, res) {
    usuarioController.validarCodigo(req, res);
})

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
});

module.exports = router;