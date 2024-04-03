const express = require("express")
const router = express.Router()

router.get("/login", (req, res) => {
    res.render("login")
})

router.get("/cadastro", (req, res) => {
    res.render("cadastro")
})
module.exports = router

/*
    app.get(/user) execuu


    vou chamar:
    /user/login -> executar login
    /user/cadastro -> executar cadastro

    tipos de chamada API -> restful API conceitos
    get -> select
    post -> insert
    put -> update
    delete -> meio obvio
*/