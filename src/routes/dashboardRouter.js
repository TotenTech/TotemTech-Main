const express = require("express");
const router = express.Router();


var dashboardController = require("../controllers/dashboardController");

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


router.post("/cadastrarTotem", function (req, res) {
    dashboardController.cadastrarTotem(req, res);
})

router.post("/cadastrarTotemComponetes", function (req, res) {
    dashboardController.cadastrarTotemComponetes(req, res);
})

router.post("/listarTotens", function(req, res){
    dashboardController.listarTotens(req, res);
})

router.post("/deletarTotemVisualizacao", function(req, res){
    dashboardController.deletarTotemVisualizacao(req, res);
})

router.post("/deletarTotem", function(req, res){
    dashboardController.deletarTotem(req, res);
})

router.post("/alterarTotem", function(req, res){
    dashboardController.alterarTotem(req, res);
})

router.post("/alterarTotemComponente", function(req, res){
    dashboardController.alterarTotemComponente(req, res);
})

router.post("/buscarInfoTotem", function(req, res){
    dashboardController.buscarInfoTotem(req, res);
})

router.post("/buscarInfoTotemComponente", function(req, res){
    dashboardController.buscarInfoTotemComponente(req, res);
})
module.exports = router;