package entities;
import java.sql.Timestamp;
public class Cpu {

    private Integer idCpu;
    private Double utilizacao;
    private Timestamp horario;
    private Double velocidade;
    private Integer qtdProcessos;
    private Integer hardware;
    private Integer totem;

    public Cpu() {}

    public Cpu(
            Double utilizacao,
            Timestamp horario,
            Double velocidade,
            Integer qtdProcessos,
            Integer hardware,
            Integer totem
    ) {
        this.utilizacao = utilizacao;
        this.horario = horario;
        this.velocidade = velocidade;
        this.qtdProcessos = qtdProcessos;
        this.hardware = hardware;
        this.totem = totem;
    }

    public Cpu(
            Integer idCpu,
            Double utilizacao,
            Timestamp horario,
            Double velocidade,
            Integer qtdProcessos,
            Integer hardware,
            Integer totem
    ) {
        this.idCpu = idCpu;
        this.utilizacao = utilizacao;
        this.horario = horario;
        this.velocidade = velocidade;
        this.qtdProcessos = qtdProcessos;
        this.hardware = hardware;
        this.totem = totem;
    }

    public Integer getIdCpu() {
        return idCpu;
    }

    public void setIdCpu(Integer idCpu) {
        this.idCpu = idCpu;
    }

    public Double getUtilizacao() {
        return utilizacao;
    }

    public void setUtilizacao(Double utilizacao) {
        this.utilizacao = utilizacao;
    }

    public Timestamp getHorario() {
        return horario;
    }

    public void setHorario(Timestamp horario) {
        this.horario = horario;
    }

    public Double getVelocidade() {
        return velocidade;
    }

    public void setVelocidade(Double velocidade) {
        this.velocidade = velocidade;
    }

    public Integer getQtdProcessos() {
        return qtdProcessos;
    }

    public void setQtdProcessos(Integer qtdProcessos) {
        this.qtdProcessos = qtdProcessos;
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
