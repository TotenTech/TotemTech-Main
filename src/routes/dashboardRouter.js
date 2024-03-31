const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("dashTotens")
})

router.get("/historico", (req, res) => {
    res.render("dashHistorico")
})

router.get("/estatisticas", (req, res) => {
    res.render("dashEstatisticas")
})

router.get("/perfil", (req, res) => {
    res.render("dashPerfil")
})

module.exports = router;