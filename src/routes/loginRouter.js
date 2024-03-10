const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("telaLogin");
})

module.exports = router;