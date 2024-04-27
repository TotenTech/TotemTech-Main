package model;

import entities.Cpu;
import entities.Memoria;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import repository.local.LocalDatabaseConnection;
import repository.remote.RemoteDatabaseConnection;

import java.util.List;

public class MemoriaModel {

    static LocalDatabaseConnection dbLocal = new LocalDatabaseConnection();
    static RemoteDatabaseConnection dbRemote = new RemoteDatabaseConnection();
    static JdbcTemplate db;

    public static Memoria getMemoria(Integer idTotem) throws Exception {
        try {
            db = dbLocal.getConexaoDoBanco();
            List<Memoria> listaMemoria = db.query("SELECT * FROM memoria WHERE totem = ?", new BeanPropertyRowMapper<>(Memoria.class), idTotem);
            if (!listaMemoria.isEmpty() && listaMemoria != null) {
                return listaMemoria.get(0);
            }
        } catch (Exception e) {
            throw new Exception("Exceção no model" + e.getMessage(), e);
        }
        return null;
    }

    public static void insertMemoria(Memoria memoria, Integer idTotem) throws Exception {
        try {
            db = dbLocal.getConexaoDoBanco();
            db.update("INSERT INTO memoria (total, medida, totem) VALUES (?, ?, ?)", memoria.getTotal(), memoria.getMedida(), idTotem);
        } catch (Exception e) {
            throw new Exception("Exceção no model" + e.getMessage(), e);
        }
    }
}
