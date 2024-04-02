const express = require("express");
const router = express.Router();

var usuarioController = require("../controllers/usuarioController");
router.get("/", (req, res) => {
    res.render("login");
})


module.exports = router;