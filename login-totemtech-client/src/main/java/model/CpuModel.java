package model;

import entities.Cpu;
import entities.Interrupcoes;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import repository.local.LocalDatabaseConnection;
import repository.remote.RemoteDatabaseConnection;

import java.util.List;

public class CpuModel {

    static LocalDatabaseConnection dbLocal = new LocalDatabaseConnection();
    static RemoteDatabaseConnection dbRemote = new RemoteDatabaseConnection();
    static JdbcTemplate db;

    public static Cpu getCpu(Integer idTotem) throws Exception {
        try {
            db = dbLocal.getConexaoDoBanco();
            List<Cpu> listaCpu = db.query("SELECT * FROM cpu WHERE totem = ?", new BeanPropertyRowMapper<>(Cpu.class), idTotem);
            if (!listaCpu.isEmpty() && listaCpu != null) {
                return listaCpu.get(0);
            }
        } catch (Exception e) {
            throw new Exception("Exceção no model" + e.getMessage(), e);
        }
        return null;
    }

    public static void insertCpu(Cpu cpu, Integer idTotem) throws Exception {
        try {
            db = dbLocal.getConexaoDoBanco();
            db.update("INSERT INTO cpu (medidaVelocidade, velocidadeBase, totem) VALUES (?, ?, ?)", cpu.getMedidaVelocidade(), cpu.getVelocidade(),idTotem);
        } catch (Exception e) {
            throw new Exception("Exceção no model" + e.getMessage(), e);
        }
    }
}
