package controller;

import entities.Cpu;
import entities.Interrupcoes;
import model.CpuModel;
import model.InterrupcoesModel;

public class CpuController {

    public static Cpu getCpu(Integer idTotem) throws Exception {
        try {
            Cpu cpu = CpuModel.getCpu(idTotem);
            if (cpu != null) {
                return cpu;
            } else {
                return null;
            }
        } catch (Exception e) {
            throw new Exception("Exceção no controller" + e.getMessage(), e);
        }
    }

    public static void insertCpu(Cpu cpu, Integer idTotem) throws Exception {
        try {
            CpuModel.insertCpu(cpu, idTotem);
        } catch (Exception e) {
            throw new Exception("Exceção no controller" + e.getMessage(), e);
        }
    }
}
