var database = require("../database/config")


function cadastrarTotem(nome, login, senha, sistemaOperacional, empresa) {
    var instrucao = `
    INSERT INTO totem (nome, login, senha, empresa, sistemaOperacional)
     VALUES ('${nome}', '${login}', '${senha}', ${empresa},'${sistemaOperacional}');     
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

function cadastrarComponentesTotem(nomeComponente,
    nome1,
    valor1,
    unidadeMedida1,
    nome2,
    valor2,
    unidadeMedida2,
    nomeComponenteCPU,
    valorCPU,
    unidadeMedidaCPU,
    nomeComponenteRede,
    nomeEspecificacao1Rede,
    valorEspecificacao1Rede,
    unidadeMedidaEspecificacao1Rede,
    nomeEspecificacao2Rede,
    valorEspecificacao2Rede,
    unidadeMedidaEspecificacao2Rede) {

    var instrucao = `
    EXEC InsertComponenteEspecificacao2 
        @nomeComponente = '${nomeComponente}',
        @nomeEspecificacao1 = '${nome1}',
        @valorEspecificacao1 = '${valor1}',
        @unidadeMedidaEspecificacao1 = '${unidadeMedida1}',
        @nomeEspecificacao2 = '${nome2}',
        @valorEspecificacao2 = '${valor2}',
        @unidadeMedidaEspecificacao2 = '${unidadeMedida2}',
        @nomeComponenteCPU = '${nomeComponenteCPU}',
        @valorCPU = '${valorCPU}',
        @unidadeMedidaCPU = '${unidadeMedidaCPU}',
        @nomeComponenteRede = '${nomeComponenteRede}',
        @nomeEspecificacao1Rede   = '${nomeEspecificacao1Rede}',
        @valorEspecificacao1Rede  = '${valorEspecificacao1Rede}',
        @unidadeMedidaEspecificacao1Rede  = '${unidadeMedidaEspecificacao1Rede}',
        @nomeEspecificacao2Rede  = '${nomeEspecificacao2Rede}',
        @valorEspecificacao2Rede  = '${valorEspecificacao2Rede}',
        @unidadeMedidaEspecificacao2Rede  = '${unidadeMedidaEspecificacao2Rede}'
         `

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function cadastrarComponentesTotemDisco(nomeComponente, nome1, valor1, unidadeMedida1, nome2, valor2, unidadeMedida2) {
    var instrucao = `
    EXEC InsertComponenteEspecificacaoDisco 
        @nomeComponente = '${nomeComponente}',
        @nomeEspecificacao1 = '${nome1}',
        @valorEspecificacao1 = '${valor1}',
        @unidadeMedidaEspecificacao1 = '${unidadeMedida1}',
        @nomeEspecificacao2 = '${nome2}',
        @valorEspecificacao2 = '${valor2}',
        @unidadeMedidaEspecificacao2 = '${unidadeMedida2}';
         `

    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}


function cadastrarTotalDiscoTotem(totalDisco) {
    var instrucao = `
    EXEC InsertTotalDisco
    @totalDisco = '${totalDisco}';
    `

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
    EXEC DeleteTotem @idTotem = ${totem};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function alterarTotem(nome, login, senha, sistemaOperacional, totem) {
    var instrucao = `UPDATE totem 
    SET  nome = '${nome}', login = '${login}', senha = '${senha}', sistemaOperacional ='${sistemaOperacional}'
    WHERE idtotem = ${totem};
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
    SELECT nome, login, senha FROM totem WHERE idtotem = ${totem};
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function alterarComponenteEspecificacao(idcomponente, tipoComponente, idespecificacao, valorEspecificacao) {
    var instrucao = `
EXEC dbo.UpdateComponenteEspecificacao
@idComponente = ${idcomponente},
@nomeComponente = "${tipoComponente}",
@idespecificacao = ${idespecificacao},
@valorEspecificacao = "${valorEspecificacao}";`;
    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function alterarEspecificacaoTotalDisco(idespecificacao, totalDisco) {
    var instrucao = `
    UPDATE especificacao SET valor = '${totalDisco}' WHERE idespecificacao = ${idespecificacao};`;
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
    SELECT * FROM visualizacao WHERE totem = ${totem};
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarInfoComponente(totem) {
    var instrucao = `
    SELECT * FROM componente WHERE totem = ${totem} ORDER BY idcomponente ASC;`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarInfoEspecificacao(totem) {
    var instrucao = `
    SELECT e.* FROM especificacao e JOIN componente c ON e.componente = c.idcomponente
    WHERE c.totem = ${totem};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarInterrupcoes() {
    var instrucao = `
    select totem as nome, horario , motivo  from interrupcoes;`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarEspecificacaoComponente(componente) {
    var instrucao = `
    SELECT 
    c.idcomponente,
    c.nome AS NomeComponente,
    c.tipo AS TipoComponente,
    e.idespecificacao,
    e.nome AS NomeEspecificacao,
    e.valor,
    e.unidadeMedida,
    e.tipo AS TipoEspecificacao
FROM 
    componente c
INNER JOIN 
    especificacao e ON c.idcomponente = e.componente
WHERE 
    c.idcomponente = ${componente}  AND e.nome = 'total'
ORDER BY 
    e.idespecificacao DESC;`
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

function selectTotemAlerta(idtotem, data, tipo) {
    var instrucao = `SELECT i.*, t.* 
    FROM interrupcoes i
    JOIN totem t ON i.totem = t.idtotem
    WHERE i.totem = ${idtotem}
    AND motivo = '${tipo}'
      AND CAST(i.horario AS DATE) = '${data}';`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function selectTotemAlertaTotal(empresa, data) {
    var instrucao = `SELECT i.*, t.* 
    FROM interrupcoes i
    JOIN totem t ON i.totem = t.idtotem
    WHERE t.empresa = ${empresa}
      AND CAST(i.horario AS DATE) = '${data}';`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrarTotem,
    cadastrarTotemComponetes,
    cadastrarComponentesTotem,
    cadastrarComponentesTotemDisco,
    cadastrarTotalDiscoTotem,
    listarTotens,
    deletarTotem,
    alterarTotem,
    alterarTotemComponente,
    alterarTotemRam,
    alterarComponenteEspecificacao,
    alterarEspecificacaoTotalDisco,
    buscarInfoTotem,
    buscarInfoTotemComponente,
    buscarInfoComponente,
    buscarInfoEspecificacao,
    buscarEspecificacaoComponente,
    buscarInterrupcoes,
    contarInterrupcoes,
    cadastrarUsuario,
    listarUsuarios,
    buscarInfoUsuario,
    deletarUsuario,
    editarUsuario,
    selectTotemAlerta,
    selectTotemAlertaTotal,
};