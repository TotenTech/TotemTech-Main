var database = require("../database/config")


function cadastrarTotem(nome, login, senha, sistemaOperacional, empresa) {
    var instrucao = `
    INSERT INTO totem (nome, login, senha, empresa, sistemaOperacional)
     VALUES ('${nome}', '${login}', '${senha}', ${empresa},'${sistemaOperacional}');     
    `;
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

function selectTotemAlerta(idtotem, data) {
    var instrucao = `SELECT i.*, t.* 
    FROM interrupcoes i
    JOIN totem t ON i.totem = t.idtotem
    WHERE i.totem = ${idtotem}
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

function buscarUltimos30Dias(empresa) {
    var instrucao = `
    SELECT * FROM interrupcoes JOIN totem ON interrupcoes.totem = totem.idtotem
WHERE horario >= DATEADD(DAY, -30, GETDATE())
  AND totem.empresa = ${empresa}
ORDER BY horario ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarInterrupcoes(start_date, end_date, empresa) {
    var instrucao = `
    SELECT totem AS nome, horario, motivo
    FROM interrupcoes JOIN totem ON interrupcoes.totem = totem.idtotem
    WHERE horario >= '${start_date} 00:00:00' AND horario <= '${end_date} 23:59:59'
	AND totem.empresa = ${empresa}
    ORDER BY horario ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function contarInterrupcoesPorMotivoUltimos30Dias(empresa) {
    var instrucao = `
        SELECT motivo, COUNT(*) AS total
        FROM interrupcoes JOIN totem ON interrupcoes.totem = totem.idtotem
        WHERE horario >= DATEADD(DAY, -30, GETDATE())
		AND totem.empresa = ${empresa}
        GROUP BY motivo;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function contarInterrupcoesPorMotivo(start_date, end_date) {
    var instrucao = `
        SELECT motivo, COUNT(*) AS total
        FROM interrupcoes
        WHERE horario >= '${start_date} 00:00:00' AND horario <= '${end_date} 23:59:59'
        GROUP BY motivo;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function obterInterrupcoesUltimas24Horas(empresa) {
    const instrucao = `
       SELECT FORMAT(horario, 'HH:00') AS hora, COUNT(*) AS total, STRING_AGG(motivo, ', ') AS motivo
        FROM interrupcoes JOIN totem ON interrupcoes.totem = totem.idtotem
        WHERE horario >= DATEADD(DAY, -1, GETDATE())
		AND totem.empresa = ${empresa}
        GROUP BY FORMAT(horario, 'HH:00')
        ORDER BY hora;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function obterInterrupcoesPorData(data, empresa) {
    const instrucao = `
     SELECT FORMAT(horario, 'HH:00') AS hora, COUNT(*) AS total, STRING_AGG(motivo, ', ') AS motivo
        FROM interrupcoes JOIN totem ON interrupcoes.totem = totem.idtotem
        WHERE CAST(horario AS DATE) = '${data}'
		AND totem.empresa = ${empresa}
        GROUP BY FORMAT(horario, 'HH:00')
        ORDER BY hora;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function obterInterrupcoesPorMotivoUltimos30Dias(totem = null, empresa) {
    let instrucao = `
SELECT interrupcoes.motivo, COUNT(*) AS total
FROM interrupcoes
JOIN totem ON interrupcoes.totem = totem.idtotem
WHERE horario >= DATEADD(DAY, -30, GETDATE()) 
  AND totem.empresa = ${empresa}`;
    if (totem) {
        instrucao += ` AND totem = ${totem}`;
    }

    instrucao += ` GROUP BY motivo;`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function obterInterrupcoesPorTotemUltimos30Dias(empresa) {
    var instrucao = `
        SELECT totem, COUNT(*) AS total
        FROM interrupcoes JOIN totem ON interrupcoes.totem = totem.idtotem
        WHERE horario >= DATEADD(DAY, -30, GETDATE())
		AND totem.empresa = ${empresa}
        GROUP BY totem;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    cadastrarTotem,
    cadastrarComponentesTotem,
    cadastrarComponentesTotemDisco,
    cadastrarTotalDiscoTotem,
    listarTotens,
    deletarTotem,
    alterarTotem,
    alterarTotemRam,
    alterarComponenteEspecificacao,
    alterarEspecificacaoTotalDisco,
    buscarInfoTotem,
    buscarInfoComponente,
    buscarInfoEspecificacao,
    buscarEspecificacaoComponente,
    cadastrarUsuario,
    listarUsuarios,
    buscarInfoUsuario,
    deletarUsuario,
    editarUsuario,
    buscarUltimos30Dias,
    buscarInterrupcoes,
    contarInterrupcoesPorMotivoUltimos30Dias,
    contarInterrupcoesPorMotivo,
    obterInterrupcoesUltimas24Horas,
    obterInterrupcoesPorData,
    obterInterrupcoesPorMotivoUltimos30Dias,
    obterInterrupcoesPorTotemUltimos30Dias,
    selectTotemAlerta,
    selectTotemAlertaTotal,
};