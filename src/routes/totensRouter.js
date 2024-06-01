const express = require("express");
const router = express.Router();

const totensController = require("../controllers/totensController");

router.get("/listAll/:empresaUsuario", (req, res) => {
    totensController.getAllTotens(req, res);
});

router.get("/getComponentLastData/:empresaUsuario/:componente", (req, res) => {
    totensController.getComponentLastData(req, res);
});

module.exports = router;