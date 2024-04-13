package controller;

import entities.Hardware;
import model.HardwareModel;

public class HardwareController {

    public static Hardware getHardware(Integer idTotem) throws Exception {
        try {
            Hardware hardware = HardwareModel.getHardware(idTotem);
            if (hardware != null) {
                return hardware;
            } else {
                return null;
            }
        } catch (Exception e) {
            throw new Exception("Exceção no controller " + e.getMessage(), e);
        }
    }
}
