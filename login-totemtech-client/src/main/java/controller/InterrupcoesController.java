package controller;

import entities.Interrupcoes;
import entities.Totem;
import model.InterrupcoesModel;
import model.TotemModel;

public class InterrupcoesController {

    public static Interrupcoes getInterrupcoes(Integer idTotem) throws Exception {
        try {
            Interrupcoes interrupcoes = InterrupcoesModel.getInterrupcoes(idTotem);
            if (interrupcoes != null) {
                return interrupcoes;
            } else {
                return null;
            }
        } catch (Exception e) {
            throw new Exception("Exceção no controller" + e.getMessage(), e);
        }
    }
}
