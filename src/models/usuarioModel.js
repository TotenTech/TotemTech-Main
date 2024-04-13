var database = require("../database/config")


function validarCodigo(codigo) {
    var instrucao = `
        SELECT id FROM empresa WHERE codigoAcesso = '${codigo}';
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function cadastrar(nome, email, senha, empresa, nivelAcesso) {
    var instrucao = `
    INSERT INTO Usuario (nome, email, senha, empresa, nivelAcesso) VALUES
    ('${nome}', '${email}', '${senha}', ${empresa}, ${nivelAcesso});`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



function verificarLogin(email, senha) {
    console.log("ACESSEI O MODEL \n \n\t\t function entrar(): ", email, senha);

    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    validarCodigo,
    cadastrar,
    verificarLogin,
};