package model;

import entities.Interrupcoes;
import entities.Totem;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import repository.local.LocalDatabaseConnection;
import repository.remote.RemoteDatabaseConnection;

import java.util.List;

public class InterrupcoesModel {

    static LocalDatabaseConnection dbLocal = new LocalDatabaseConnection();
    static RemoteDatabaseConnection dbRemote = new RemoteDatabaseConnection();
    static JdbcTemplate db;

    public static Interrupcoes getInterrupcoes(Integer idTotem) throws Exception {
        try {
            db = dbLocal.getConexaoDoBanco();
            List<Interrupcoes> listaInterrupcoes = db.query("SELECT * FROM interrupcoes WHERE totem = ?", new BeanPropertyRowMapper<>(Interrupcoes.class), idTotem);
                if (!listaInterrupcoes.isEmpty() && listaInterrupcoes != null) {
                    return listaInterrupcoes.get(0);
                }
        } catch (Exception e) {
            throw new Exception("Exceção no model" + e.getMessage(), e);
        }
        return null;
    }
}
