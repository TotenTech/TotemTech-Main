package entities;

public class Hardware {

    private Integer idHardware;
    private Integer memoriaTotal;
    private Integer espacoDisco;
    private Double velocidadeCpu;
    private Integer totem;

    public Hardware() {}

    public Hardware(
            Integer memoriaTotal,
            Integer espacoDisco,
            Double velocidadeCpu,
            Integer totem
    ) {
        this.memoriaTotal = memoriaTotal;
        this.espacoDisco = espacoDisco;
        this.velocidadeCpu = velocidadeCpu;
        this.totem = totem;
    }

    public Hardware(
            Integer idHardware,
            Integer memoriaTotal,
            Integer espacoDisco,
            Double velocidadeCpu,
            Integer totem
    ) {
        this.idHardware = idHardware;
        this.memoriaTotal = memoriaTotal;
        this.espacoDisco = espacoDisco;
        this.velocidadeCpu = velocidadeCpu;
        this.totem = totem;
    }

    public Integer getIdHardware() {
        return idHardware;
    }

    public void setIdHardware(Integer idHardware) {
        this.idHardware = idHardware;
    }

    public Integer getMemoriaTotal() {
        return memoriaTotal;
    }

    public void setMemoriaTotal(Integer memoriaTotal) {
        this.memoriaTotal = memoriaTotal;
    }

    public Integer getEspacoDisco() {
        return espacoDisco;
    }

    public void setEspacoDisco(Integer espacoDisco) {
        this.espacoDisco = espacoDisco;
    }

    public Double getVelocidadeCpu() {
        return velocidadeCpu;
    }

    public void setVelocidadeCpu(Double velocidadeCpu) {
        this.velocidadeCpu = velocidadeCpu;
    }

    public Integer getTotem() {
        return totem;
    }

    public void setTotem(Integer totem) {
        this.totem = totem;
    }

    @Override
    public String toString() {
        return "Hardware{" +
                "idHardware=" + idHardware +
                ", memoriaTotal=" + memoriaTotal +
                ", espacoDisco=" + espacoDisco +
                ", velocidadeCpu=" + velocidadeCpu +
                ", totem=" + totem +
                '}';
    }
}
