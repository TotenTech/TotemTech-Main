var database = require("../database/config")


function cadastrarTotem(nome, login, senha, sistemaOperacional, empresa) {
    var instrucao = `
    INSERT INTO totem (nome, login, senha, sistemaOperacional, empresa)
     VALUES ('${nome}', '${login}', '${senha}', '${sistemaOperacional}', ${empresa});     
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function cadastrarTotemComponetes(cpu, rede, ram, disco) {

    var instrucao = `INSERT INTO visualizacao (cpu, memoria, disco, rede, totem)VALUES 
    (${cpu}, ${ram}, ${disco}, ${rede}, (SELECT MAX(idtotem) FROM totem));`

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function cadastrarTotemRam(total, tipoComponente) {

    var instrucao = `INSERT INTO componente (nome, medida, totem)VALUES 
    (${total}, 'GB', (SELECT MAX(idtotem) FROM totem));`

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function cadastrarTotemDisco(disco, total) {

    var instrucao = `INSERT INTO disco (tipo, medida, total, totem)
    VALUES("${disco}", 'GB', '${total}', (SELECT MAX(idtotem) FROM totem));`

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function listarTotens(empresa) {
    var instrucao = `
    select nome, idtotem from totem WHERE empresa = ${empresa};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarTotem(totem) {
    var instrucao = `
CALL excluirTudoTotem(${totem});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function alterarTotem(nome, login, senha, sistemaOperacional, totem) {
    var instrucao = `UPDATE totem 
    SET  nome = '${nome}', login = '${login}', senha = '${senha}', sistemaOperacional = '${sistemaOperacional}' WHERE idtotem = ${totem};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function alterarTotemComponente(cpu, rede, memoria, disco, totem) {
    var instrucao = `
    UPDATE visualizacao 
    SET cpu = ${cpu}, memoria = ${memoria}, disco = ${disco}, rede = ${rede}
    WHERE totem = ${totem};
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function alterarTotemRam(ram, totem) {
    var instrucao = `
    UPDATE memoria 
SET total = "${ram}" WHERE totem = ${totem};
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function alterarTotemDisco(id, total, tipo, totem) {
    var instrucao = `
    UPDATE disco SET tipo = '${tipo}', total = '${total}' 
WHERE totem = ${totem} AND iddisco = ${id};`;
    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function buscarInfoTotemComponente(totem) {
    var instrucao = `
    SELECT cpu, memoria, disco, rede FROM visualizacao WHERE totem = ${totem};
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarInfoTotemTotalRam(totem) {
    var instrucao = `
SELECT total FROM memoria WHERE totem = ${totem};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarInfoTotemTipoDisco(totem) {
    var instrucao = `
    SELECT iddisco, tipo, total FROM disco WHERE totem  = ${totem};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function buscarInfoTotem(totem) {
    var instrucao = `
    SELECT nome, login, senha, sistemaOperacional FROM totem WHERE idtotem = ${totem};
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function buscarInterrupcoes() {
    var instrucao = `
    select totem as nome, horario , motivo  from interrupcoes;`

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function contarInterrupcoes() {
    var instrucao = `
    select count(*) as total from interrupcoes;`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarUsuario(nome, email, senha, empresa, nivelAcesso) {
    var instrucao = `
    INSERT INTO usuario (nome, email, senha, empresa, tipo) VALUES
    ('${nome}', '${email}', '${senha}', ${empresa}, ${nivelAcesso});  
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function listarUsuarios(empresa) {
    var instrucao = `
    SELECT * FROM usuario where empresa = ${empresa};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarInfoUsuario(id) {
    var instrucao = `SELECT * FROM usuario WHERE idusuario = ${id};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarUsuario(id) {
    var instrucao = `DELETE FROM usuario WHERE idUsuario = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editarUsuario(id, nome, email, senha, tipo) {
    var instrucao = `
    UPDATE usuario 
    SET  nome = '${nome}', email = '${email}', senha = '${senha}', tipo = '${tipo}' WHERE idUsuario = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrarTotem,
    cadastrarTotemComponetes,
    cadastrarTotemRam,
    cadastrarTotemDisco,
    listarTotens,
    deletarTotem,
    alterarTotem,
    alterarTotemComponente,
    alterarTotemRam,
    alterarTotemDisco,
    buscarInfoTotem,
    buscarInfoTotemComponente,
    buscarInfoTotemTotalRam,
    buscarInfoTotemTipoDisco,
    buscarInterrupcoes,
    contarInterrupcoes,
    cadastrarUsuario,
    listarUsuarios,
    buscarInfoUsuario,
    deletarUsuario,
    editarUsuario,
};