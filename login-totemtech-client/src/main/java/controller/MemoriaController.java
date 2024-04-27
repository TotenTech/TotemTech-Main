package controller;

import entities.Cpu;
import entities.Memoria;
import model.MemoriaModel;

public class MemoriaController {

    public static Memoria getMemoria(Integer idTotem) throws Exception {
        try {
            Memoria memoria = MemoriaModel.getMemoria(idTotem);
            if (memoria != null) {
                return memoria;
            } else {
                return null;
            }
        } catch (Exception e) {
            throw new Exception("Exceção no controller" + e.getMessage(), e);
        }
    }

    public static void insertMemoria(Memoria memoria, Integer idTotem) throws Exception {
        try {
            MemoriaModel.insertMemoria(memoria, idTotem);
        } catch (Exception e) {
            throw new Exception("Exceção no controller" + e.getMessage(), e);
        }
    }
}
