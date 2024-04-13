package entities;

import java.sql.Timestamp;

public class Rede {

    private Integer idRede;
    private Double download;
    private Double upload;
    private Timestamp horario;
    private Integer hardware;
    private Integer totem;

    public Rede() {}

    public Rede(
            Double download,
            Double upload,
            Timestamp horario,
            Integer hardware,
            Integer totem
    ) {
        this.download = download;
        this.upload = upload;
        this.horario = horario;
        this.hardware = hardware;
        this.totem = totem;
    }

    public Rede(Integer idRede, Double download, Double upload, Timestamp horario, Integer hardware, Integer totem) {
        this.idRede = idRede;
        this.download = download;
        this.upload = upload;
        this.horario = horario;
        this.hardware = hardware;
        this.totem = totem;
    }

    public Integer getIdRede() {
        return idRede;
    }

    public void setIdRede(Integer idRede) {
        this.idRede = idRede;
    }

    public Double getDownload() {
        return download;
    }

    public void setDownload(Double download) {
        this.download = download;
    }

    public Double getUpload() {
        return upload;
    }

    public void setUpload(Double upload) {
        this.upload = upload;
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
