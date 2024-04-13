package entities;

import java.sql.Timestamp;

public class Memoria {

    private Integer idMemoria;
    private Double emUso;
    private Timestamp horario;
    private Integer hardware;
    private Integer totem;

    public Memoria() {}

    public Memoria(
            Double emUso,
            Timestamp horario,
            Integer hardware,
            Integer totem
    ) {
        this.emUso = emUso;
        this.horario = horario;
        this.hardware = hardware;
        this.totem = totem;
    }

    public Memoria(
            Integer idMemoria,
            Double emUso,
            Timestamp horario,
            Integer hardware,
            Integer totem
    ) {
        this.idMemoria = idMemoria;
        this.emUso = emUso;
        this.horario = horario;
        this.hardware = hardware;
        this.totem = totem;
    }

    public Integer getIdMemoria() {
        return idMemoria;
    }

    public void setIdMemoria(Integer idMemoria) {
        this.idMemoria = idMemoria;
    }

    public Double getEmUso() {
        return emUso;
    }

    public void setEmUso(Double emUso) {
        this.emUso = emUso;
    }

    public Timestamp getHorario() {
        return horario;
    }

    public void setHorario(Timestamp horario) {
        this.horario = horario;
    }

    public Integer getHardware() {
        return hardware;
    }

    public void setHardware(Integer hardware) {
        this.hardware = hardware;
    }

    public Integer getTotem() {
        return totem;
    }

    public void setTotem(Integer totem) {
        this.totem = totem;
    }
}
