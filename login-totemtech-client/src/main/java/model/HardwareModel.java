package model;

import entities.Hardware;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import repository.local.LocalDatabaseConnection;
import repository.remote.RemoteDatabaseConnection;

import java.util.List;

public class HardwareModel {

    static LocalDatabaseConnection dbLocal = new LocalDatabaseConnection();
    static RemoteDatabaseConnection dbRemote = new RemoteDatabaseConnection();
    static JdbcTemplate db;

    public static Hardware getHardware(Integer idTotem) throws Exception {
        try {
            db = dbLocal.getConexaoDoBanco();
            List<Hardware> h = db.query("SELECT * FROM hardware where totem = ?", new BeanPropertyRowMapper<>(Hardware.class), idTotem);
            if (!h.isEmpty()) {
                return h.get(0);
            } else {
                return null;
            }
        } catch (Exception e) {
            throw new Exception("Exceção no model " + e.getMessage(), e);
        }
    }
}
