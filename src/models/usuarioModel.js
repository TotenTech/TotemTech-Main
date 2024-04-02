var database = require("../database/config")


function validarCodigo(codigo) {
    var instrucao = `
        SELECT id FROM empresa WHERE codigoAcesso = '${codigo}';
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function cadastrar(nome, email, senha, empresa) {
    var instrucao = `
    INSERT INTO Usuario (nome, email, senha, empresa) VALUES
    ('${nome}', '${email}', '${senha}', ${empresa});`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    validarCodigo,
    cadastrar
};