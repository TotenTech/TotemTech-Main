const express = require("express");
const router = express.Router();

var usuarioController = require("../controllers/usuarioController");
router.get("/", (req, res) => {
    res.render("login");
})

router.post("/verificarLogin", function (req, res) {
    usuarioController.verificarLogin(req, res);
});

module.exports = router;