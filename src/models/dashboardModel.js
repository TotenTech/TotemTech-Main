var database = require("../database/config")



function cadastrarTotem(nome, login, senha,sistemaOperacional, empresa) {
    var instrucao = `
    INSERT INTO totem (nome, login, senha, sistemaOperacional, empresa)
     VALUES ('${nome}', '${login}', '${senha}', '${sistemaOperacional}', '${empresa}');     
    `;   
    console.log("Executando a instrução SQL: \n" + instrucao);
    
    return database.executar(instrucao);
}

function cadastrarTotemComponetes( cpu, rede, ram, disco) {

    var instrucao = `INSERT INTO visualizacao (cpu, memoria, disco, rede, totem)VALUES 
    (${cpu}, ${rede}, ${ram}, ${disco}, (SELECT MAX(idtotem) FROM totem));`
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    
    return database.executar(instrucao, instrucao);
}

function listarTotens(empresa){
    var instrucao = `
    select nome, idtotem from totem WHERE empresa = ${empresa};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarTotemVisualizacao(totem) {
    var instrucao = `
    DELETE FROM visualizacao WHERE totem = ${totem}; 
    `;   
    console.log("Executando a instrução SQL: \n" + instrucao);
    
    return database.executar(instrucao);
}

function deletarTotem(totem){
    var instrucao = `
    DELETE FROM totem WHERE idtotem = ${totem};
    `;   
    console.log("Executando a instrução SQL: \n" + instrucao);
    
    return database.executar(instrucao);
}

function alterarTotem(nome, login, senha,sistemaOperacional , totem){
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

function buscarInfoTotem(totem) {
    var instrucao = `
    SELECT nome, login, senha, sistemaOperacional FROM totem WHERE idtotem = ${totem};
        `;
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

module.exports = {
    cadastrarTotem,
    cadastrarTotemComponetes,
    listarTotens,
    deletarTotemVisualizacao,
    deletarTotem,
    alterarTotem,
    alterarTotemComponente,
    buscarInfoTotem,
    buscarInfoTotemComponente,
};