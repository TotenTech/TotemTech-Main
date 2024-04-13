package entities;

import java.sql.Timestamp;

public class Disco {

    private Integer idDisco;
    private Double emUso;
    private Timestamp horario;
    private Integer hardware;
    private Integer totem;

    public Disco() {}

    public Disco(
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

    public Disco(
            Integer idDisco,
            Double emUso,
            Timestamp horario,
            Integer hardware,
            Integer totem
    ) {
        this.idDisco = idDisco;
        this.emUso = emUso;
        this.horario = horario;
        this.hardware = hardware;
        this.totem = totem;
    }

    public Integer getIdDisco() {
        return idDisco;
    }

    public void setIdDisco(Integer idDisco) {
        this.idDisco = idDisco;
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
