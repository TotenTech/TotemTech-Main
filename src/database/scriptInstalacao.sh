
#!/bin/bash

# Define a senha do usuário root do MySQL automaticamente
MYSQL_ROOT_PASSWORD="root1234@"

# Verifica se o MySQL está instalado
if ! command -v mysql &> /dev/null
then
    echo "MySQL não encontrado. Instalando..."
    sudo apt update
    sudo apt install mysql-server
    echo "MySQL instalado com sucesso."
    
else
    echo "MySQL já está instalado."
fi

# Configura a senha do usuário root do MySQL
if sudo mysql -e "SELECT 1;" &> /dev/null
then
    echo "MySQL está em execução."
    #read -sp "Digite a senha do usuário root do MySQL: " MYSQL_ROOT_PASSWORD
    # Ou caso queira um script completamente automatico 
    echo "A senha do usuário root é root1234@"
    MYSQL_ROOT_PASSWORD = "root1234@"
else
    echo "Erro: MySQL não está em execução."
    exit 1
fi

# Reinicia o serviço do MySQL
echo "Reiniciando o serviço do MySQL..."
sudo service mysql restart
echo "Senha do usuário root do MySQL configurada com sucesso."

# Configurações do MySQL
MYSQL_USER="root"
MYSQL_PASSWORD="$MYSQL_ROOT_PASSWORD"  # Usa a senha do usuário root
MYSQL_DATABASE="totemTech"

# Criando o banco de dados 
mysql -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS $MYSQL_DATABASE;"
echo "Banco de dados '$MYSQL_DATABASE' criado com sucesso."

# Executa as queries para criar as tabelas
SQL_TABELAS="
CREATE TABLE endereco (
  idEndereco INT primary key AUTO_INCREMENT,
  logradouro VARCHAR(45),
  bairro VARCHAR(45),
  numero INT,
  cep CHAR(8),
  complemento VARCHAR(45));


CREATE TABLE contrato (
  idplano INT primary key auto_increment,
  codigo CHAR(9),
  contasContratadas INT,
  dtInicio DATE,
  dtFinal DATE);


CREATE TABLE empresa (
  idEmpresa INT primary key auto_increment,
  nome VARCHAR(45),
  codigoAcesso CHAR(6),
  endereco INT,
  assinatura INT,
  razaoSocial VARCHAR(65),
  nomeFantasia VARCHAR(45),
  cnpj CHAR(15),
  CONSTRAINT fk_empresa_endereco
    FOREIGN KEY (endereco)
    REFERENCES endereco (idEndereco),
  CONSTRAINT fk_empresa_assinatura
    FOREIGN KEY (assinatura)
    REFERENCES contrato (idplano));



CREATE TABLE tipo (
  idtipo INT primary key AUTO_INCREMENT,
  descricao VARCHAR(45));



CREATE TABLE usuario (
  idusuario INT primary key auto_increment,
  nome VARCHAR(45),
  email VARCHAR(70),
  senha VARCHAR(12),
  empresa INT,
  tipo INT,
  CONSTRAINT fk_usuario_empresa
    FOREIGN KEY (empresa)
    REFERENCES empresa (idEmpresa),
  CONSTRAINT fk_usuario_tipo
    FOREIGN KEY (tipo)
    REFERENCES tipo (idtipo));


CREATE TABLE totem (
  idtotem INT primary key auto_increment,
  nome VARCHAR(45),
  login VARCHAR(45),
  senha VARCHAR(45),
  sistemaOperacional VARCHAR(45),
  empresa INT,
  CONSTRAINT fk_totem_empresa
    FOREIGN KEY (empresa)
    REFERENCES empresa (idEmpresa));


CREATE TABLE interrupcoes (
  idinterrupcoes INT primary key AUTO_INCREMENT,
  horario DATETIME,
  motivo VARCHAR(45),
  totem INT,
  CONSTRAINT fk_interrupcoes_totem
	FOREIGN KEY (totem)
    REFERENCES totem(idTotem));


CREATE TABLE cpu (
  idcpu INT NOT NULL,
  medidaVelocidade VARCHAR(45) NULL,
  velocidadeBase VARCHAR(45) NULL,
  totem INT NOT NULL,
  PRIMARY KEY (idcpu, totem),
  CONSTRAINT fk_cpu_totem
    FOREIGN KEY (totem)
    REFERENCES totem (idtotem));


CREATE TABLE cpuRegistro (
  idcpuRegistro INT auto_increment,
  utilizacao DOUBLE,
  horario DATETIME,
  velocidade DOUBLE,
  processos INT,
  cpu INT,
  totem INT,
  PRIMARY KEY (idcpuRegistro, cpu, totem),
  CONSTRAINT fk_cpuRegistro_cpu
    FOREIGN KEY (cpu, totem)
    REFERENCES cpu (idcpu, totem));


CREATE TABLE redeRegistro (
  idredeRegistro INT auto_increment,
  download DOUBLE,
  upload DOUBLE,
  horario DATETIME,
  totem INT,
  PRIMARY KEY (idredeRegistro, totem),
  CONSTRAINT fk_redeRegistro_totem
    FOREIGN KEY (totem)
    REFERENCES totem (idtotem));


CREATE TABLE memoria (
  idmemoria INT,
  total DOUBLE,
  medida VARCHAR(45),
  totem INT,
  PRIMARY KEY (idmemoria, totem),
  CONSTRAINT fk_memoria_totem
    FOREIGN KEY (totem)
    REFERENCES totem (idtotem));


CREATE TABLE disco (
  iddisco INT,
  tipo VARCHAR(45),
  total DOUBLE,
  medida VARCHAR(45),
  totem INT,
  PRIMARY KEY (iddisco, totem),
  CONSTRAINT fk_disco_totem
    FOREIGN KEY (totem)
    REFERENCES totem (idtotem));


CREATE TABLE discoRegistro (
  iddiscoRegistro INT auto_increment,
  valor DOUBLE,
  horario DATETIME,
  disco INT,
  totem INT,
  PRIMARY KEY (iddiscoRegistro, disco, totem),
  CONSTRAINT fk_discoRegistro_disco
    FOREIGN KEY (disco, totem)
    REFERENCES disco (iddisco , totem));


CREATE TABLE visualizacao (
  idvisualizacao INT primary key AUTO_INCREMENT,
  cpu INT,
  memoria INT,
  disco INT,
  rede INT,
  totem INT,
  CONSTRAINT fk_componente_totem
    FOREIGN KEY (totem)
    REFERENCES totem (idtotem));


CREATE TABLE memoriaRegistro (
  idmemoriaRegistro INT auto_increment,
  valor DOUBLE,
  horario DATETIME,
  memoria INT,
  totem INT,
  PRIMARY KEY (idmemoriaRegistro, memoria, totem),
  CONSTRAINT fk_memoriaRegistro_memoria
    FOREIGN KEY (memoria, totem)
    REFERENCES memoria (idmemoria, totem));
";

mysql -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" "$SQL";

java -version  # Verifica a versão atual do Java

if [ $? = 0 ]; then
    echo "Java instalado"
else
    echo "Java não instalado"
        sudo apt install openjdk-17-jre -y
fi
