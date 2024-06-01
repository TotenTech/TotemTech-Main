const database = require("../database/config");

function getAllTotens(idCompany) {

    let query = `SELECT * FROM totem WHERE empresa = ${idCompany}`;

    return database.executar(query);
}

function getComponentLastData(idCompany, component) {
    let query = `SELECT 
                    r.valor,
                    r.horario,
                    t.idtotem
                FROM 
                    totem t
                JOIN 
                    componente c ON t.idtotem = c.totem
                OUTER APPLY (
                    SELECT TOP 1 
                        r.valor, 
                        r.horario
                    FROM 
                        registro r
                    WHERE 
                        r.componente = c.idComponente
                    ORDER BY 
                        r.horario DESC
                ) AS r
                WHERE 
                    c.tipo = ${component}
                    AND t.empresa = ${idCompany}
                ORDER BY 
                    r.horario DESC;`;

                    console.log("Executando a query " + query)
                    return database.executar(query);
}

module.exports = {
    getAllTotens,
    getComponentLastData
}