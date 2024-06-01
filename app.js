const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const app = express();

const port = 8080;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "/views"));

app.listen(port, () => {
    console.log("Servidor iniciado na porta " + port);
});

const indexRouter = require("./src/routes/indexRouter");
const cadastroRouter = require("./src/routes/cadastroRouter");
const dashboardRouter = require("./src/routes/dashboardRouter");
const loginRouter = require("./src/routes/loginRouter");
const erroRouter = require("./src/routes/erroRouter");
const totensRouter = require("./src/routes/totensRouter");

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/cadastro", cadastroRouter);
app.use("/dashboard", dashboardRouter);
app.use("/erro", erroRouter);
app.use("/totens", totensRouter);