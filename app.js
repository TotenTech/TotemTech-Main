const express = require("express");
const path = require("path");
const app = express();

const port = 8080;

app.use(express.static(__dirname + '/public'));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "/views"));

app.listen(port, () => {
    console.log("Servidor iniciado na porta " + port)
});

const indexRouter = require("./src/routes/indexRouter");
const loginRouter = require("./src/routes/loginRouter");
const cadastroRouter = require("./src/routes/cadastroRouter");
const codigoRouter = require("./src/routes/codigoRouter");

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/cadastro", cadastroRouter);
app.use("codigo", codigoRouter);