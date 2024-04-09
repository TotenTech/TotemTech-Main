const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("dashboard/totens")
})

router.get("/historico", (req, res) => {
    res.render("dashboard/historico")
})

router.get("/estatisticas", (req, res) => {
    res.render("dashboard/estatisticas")
})

router.get("/gerenciarT", (req, res) => {
    res.render("dashboard/gerenciarTotens")
})


module.exports = router;