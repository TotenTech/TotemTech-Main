package entities;

public class Totem {

    private Integer idTotem;
    private String nome;
    private String email;
    private String senha;
    private Integer interrupcoes;
    private String sistemaOperacional;
    private Integer empresa;
    private Integer cpuAtivo;
    private Integer memoriaAtivo;
    private Integer discoAtivo;
    private Integer redeAtivo;

    public Totem() {}

    public Totem(
            Integer idTotem,
            String nome,
            String email,
            String senha,
            Integer interrupcoes,
            String sistemaOperacional,
            Integer empresa,
            Integer cpuAtivo,
            Integer memoriaAtivo,
            Integer discoAtivo,
            Integer redeAtivo
    ) {
        this.idTotem = idTotem;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.interrupcoes = interrupcoes;
        this.sistemaOperacional = sistemaOperacional;
        this.empresa = empresa;
        this.cpuAtivo = cpuAtivo;
        this.memoriaAtivo = memoriaAtivo;
        this.discoAtivo = discoAtivo;
        this.redeAtivo = redeAtivo;
    }

    public Totem(
            String nome,
            String email,
            String senha,
            Integer interrupcoes,
            String sistemaOperacional,
            Integer empresa,
            Integer cpuAtivo,
            Integer memoriaAtivo,
            Integer discoAtivo,
            Integer redeAtivo
    ) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.interrupcoes = interrupcoes;
        this.sistemaOperacional = sistemaOperacional;
        this.empresa = empresa;
        this.cpuAtivo = cpuAtivo;
        this.memoriaAtivo = memoriaAtivo;
        this.discoAtivo = discoAtivo;
        this.redeAtivo = redeAtivo;
    }

    public Integer getIdTotem() {
        return idTotem;
    }

    public void setIdTotem(Integer idTotem) {
        this.idTotem = idTotem;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Integer getInterrupcoes() {
        return interrupcoes;
    }

    public void setInterrupcoes(Integer interrupcoes) {
        this.interrupcoes = interrupcoes;
    }

    public String getSistemaOperacional() {
        return sistemaOperacional;
    }

    public void setSistemaOperacional(String sistemaOperacional) {
        this.sistemaOperacional = sistemaOperacional;
    }

    public Integer getEmpresa() {
        return empresa;
    }

    public void setEmpresa(Integer empresa) {
        this.empresa = empresa;
    }

    public Integer getCpuAtivo() {
        return cpuAtivo;
    }

    public void setCpuAtivo(Integer cpuAtivo) {
        this.cpuAtivo = cpuAtivo;
    }

    public Integer getMemoriaAtivo() {
        return memoriaAtivo;
    }

    public void setMemoriaAtivo(Integer memoriaAtivo) {
        this.memoriaAtivo = memoriaAtivo;
    }

    public Integer getDiscoAtivo() {
        return discoAtivo;
    }

    public void setDiscoAtivo(Integer discoAtivo) {
        this.discoAtivo = discoAtivo;
    }

    public Integer getRedeAtivo() {
        return redeAtivo;
    }

    public void setRedeAtivo(Integer redeAtivo) {
        this.redeAtivo = redeAtivo;
    }

    @Override
    public String toString() {
        return "Totem{" +
                "nome='" + nome + '\'' +
                ", email='" + email + '\'' +
                ", senha='" + senha + '\'' +
                ", interrupcoes=" + interrupcoes +
                ", sistemaOperacional='" + sistemaOperacional + '\'' +
                ", empresa=" + empresa +
                ", cpuAtivo=" + cpuAtivo +
                ", memoriaAtivo=" + memoriaAtivo +
                ", discoAtivo=" + discoAtivo +
                ", redeAtivo=" + redeAtivo +
                '}';
    }
}
