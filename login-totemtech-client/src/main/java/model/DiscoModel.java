package model;

import entities.Cpu;
import entities.Disco;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import repository.local.LocalDatabaseConnection;
import repository.remote.RemoteDatabaseConnection;

import java.util.List;

public class DiscoModel {

    static LocalDatabaseConnection dbLocal = new LocalDatabaseConnection();
    static RemoteDatabaseConnection dbRemote = new RemoteDatabaseConnection();
    static JdbcTemplate db;

    public static List<Disco> getDiscos(Integer idTotem) throws Exception {
        try {
            db = dbLocal.getConexaoDoBanco();
            List<Disco> listaDiscos = db.query("SELECT * FROM disco WHERE totem = ?", new BeanPropertyRowMapper<>(Disco.class), idTotem);
            if (!listaDiscos.isEmpty() && listaDiscos != null) {
                return listaDiscos;
            }
        } catch (Exception e) {
            throw new Exception("Exceção no model" + e.getMessage(), e);
        }
        return null;
    }

    public static void insertDisco(Disco disco) throws Exception {
        try {
            db = dbLocal.getConexaoDoBanco();
            db.update("INSERT INTO disco (tipo, total, medida, totem) VALUES (?, ?, ?, ?)", disco.getTipo(), disco.getTotal(), disco.getMedida(), disco.getTotem());
        } catch (Exception e) {
            throw new Exception("Exceção no model" + e.getMessage(), e);
        }
    }
}
