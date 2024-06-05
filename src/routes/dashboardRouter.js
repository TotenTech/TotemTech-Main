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

router.get("/gerenciarU", (req, res) => {
    res.render("dashboard/gerenciarUsuarios")
})

router.post("/cadastrarTotem", function (req, res) {
    dashboardController.cadastrarTotem(req, res);
})

router.post("/cadastrarTotemComponetes", function (req, res) {
    dashboardController.cadastrarTotemComponetes(req, res);
})

router.post("/cadastrarComponentesTotemDisco", function (req, res) {
    dashboardController.cadastrarComponentesTotemDisco(req, res);
})

router.post("/cadastrarComponentesTotem", function (req, res) {
    dashboardController.cadastrarComponentesTotem(req, res);
})


router.post("/buscarInfoComponente", function (req, res) {
    dashboardController.buscarInfoComponente(req, res);
})

router.post("/buscarInfoEspecificacao", function (req, res) {
    dashboardController.buscarInfoEspecificacao(req, res);
})

router.post("/buscarEspecificacaoComponente", function (req, res) {
    dashboardController.buscarEspecificacaoComponente(req, res);
})

router.post("/listarTotens", function(req, res){
    dashboardController.listarTotens(req, res);
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

router.post("/alterarComponenteEspecificacao", function(req, res){
    dashboardController.alterarComponenteEspecificacao(req, res);
})

router.post("/buscarInfoTotem", function(req, res){
    dashboardController.buscarInfoTotem(req, res);
})

router.post("/buscarInfoTotemComponente", function(req, res){
    dashboardController.buscarInfoTotemComponente(req, res);
})

router.post("/cadastrarUsuario", function (req, res) {
    dashboardController.cadastrarUsuario(req, res);
})

router.post("/listarUsuarios", function(req, res){
    dashboardController.listarUsuarios(req, res);
})

router.post("/buscarInfoUsuario", function(req, res){
    dashboardController.buscarInfoUsuario(req, res);
})

router.post("/deletarUsuario", function(req, res){
    dashboardController.deletarUsuario(req, res);
})

router.post("/editarUsuario", function (req, res) {
    dashboardController.editarUsuario(req, res);
})

router.get("/buscarUltimos30Dias", function(req, res){
    dashboardController.buscarUltimos30Dias(req, res);
});

router.get("/buscarInterrupcoes", function(req, res){
    dashboardController.buscarInterrupcoes(req, res);
});

router.get("/contarInterrupcoesPorMotivoUltimos30Dias", function(req, res){
    dashboardController.contarInterrupcoesPorMotivoUltimos30Dias(req, res);
});

router.get("/buscarInterrupcoesUltimas24Horas", function(req, res){
    dashboardController.buscarInterrupcoesUltimas24Horas(req, res);
});

router.get("/buscarInterrupcoesPorData", function(req, res){
    dashboardController.buscarInterrupcoesPorData(req, res);
});


router.get("/motivoUltimos30Dias", function(req, res){
    dashboardController.obterInterrupcoesPorMotivoUltimos30Dias(req, res);
});

router.get("/totemUltimos30Dias", function(req, res){
    dashboardController.obterInterrupcoesPorTotemUltimos30Dias(req, res);
});

module.exports = router;