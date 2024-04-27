package controller;

import entities.Disco;
import model.DiscoModel;

import java.util.List;

public class DiscoController {

    public static List<Disco> getDiscos(Integer idTotem) throws Exception {
        try {
            List<Disco> discos = DiscoModel.getDiscos(idTotem);
            if (discos != null) {
                return discos;
            } else {
                return null;
            }
        } catch (Exception e) {
            throw new Exception("Exceção no controller" + e.getMessage(), e);
        }
    }

    public static void insertDisco(Disco disco) throws Exception {
        try {
            DiscoModel.insertDisco(disco);
        } catch (Exception e) {
            throw new Exception("Exceção no controller" + e.getMessage(), e);
        }
    }
}
