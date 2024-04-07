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

router.get("/gerenciarT", (req, res) => {
    res.render("gerenciarT")
})


module.exports = router;