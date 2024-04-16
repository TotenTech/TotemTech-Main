var database = require("../database/config")// Mudar a rota depois

function cadastrar(nome, email,senha, codigo) {
    var instrucao = `
        INSERT INTO usuario (nome, email, senha, codigo) VALUES
         ('${nome}' , '${email}', '${senha}','${codigo}');`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar
};