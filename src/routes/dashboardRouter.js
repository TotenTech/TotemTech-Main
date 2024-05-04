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

router.post("/cadastrarTotemRam", function (req, res) {
    dashboardController.cadastrarTotemRam(req, res);
})

router.post("/cadastrarTotemDisco", function (req, res) {
    dashboardController.cadastrarTotemDisco(req, res);
})

router.post("/buscarInfoTotemTotalRam", function (req, res) {
    dashboardController.buscarInfoTotemTotalRam(req, res);
})

router.post("/buscarInfoTotemTipoDisco", function (req, res) {
    dashboardController.buscarInfoTotemTipoDisco(req, res);
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

router.post("/alterarTotemRam", function(req, res){
    dashboardController.alterarTotemRam(req, res);
})

router.post("/alterarTotemDisco", function(req, res){
    dashboardController.alterarTotemDisco(req, res);
})

router.post("/buscarInfoTotem", function(req, res){
    dashboardController.buscarInfoTotem(req, res);
})

router.post("/buscarInfoTotemComponente", function(req, res){
    dashboardController.buscarInfoTotemComponente(req, res);
})
module.exports = router;