
var sql = require('mssql');


// CONEXÃO DO MYSQL WORKBENCH
var sqlConfig = {
    server: "localhost",
    database: "totemTech",
    user: "totemMaster",
    password: "12345",
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};


function executar(instrucao) {

    return new Promise(function (resolve, reject) {
        sql.connect(sqlConfig, (erro) => {
            if (erro) {
                reject('Erro ao conectar ao SQL Server: ' + erro);
                return;
            }
            const requisicao = new sql.Request();
            requisicao.query(instrucao, function (erro, resultados) {
                if (erro) {
                    reject(erro);
                    return;
                }
                console.log(resultados);
                resolve(resultados.recordset);
            });
            sql.on('error', function (erro) {
                return ("ERRO NO SQL: ", erro.sqlMessage);
            });
        });
    });

}

module.exports = {
    executar
}
