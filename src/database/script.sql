DROP DATABASE IF EXISTS totemTech;
CREATE DATABASE totemTech;
USE totemTech;

-- CRIAÇÃO DAS TABELAS

CREATE TABLE empresa (
  idEmpresa INT primary key auto_increment,
  nome VARCHAR(45),
  codigoAcesso CHAR(9),
  contasPermitidas INT,
  contasCriadas INT,
  email VARCHAR(70),
  logradouro VARCHAR(50),
  numero INT,
  bairro VARCHAR(55));


CREATE TABLE usuario (
  idUsuario INT primary key auto_increment,
  nome VARCHAR(45),
  email VARCHAR(70),
  senha VARCHAR(12),
  empresa INT,
  nivelAcesso INT,
  CONSTRAINT fk_usuario_empresa1
    FOREIGN KEY (empresa)
    REFERENCES empresa(idEmpresa));


CREATE TABLE totem (
  idTotem INT primary key auto_increment,
  nome VARCHAR(45),
  email VARCHAR(45),
  senha VARCHAR(45),
  interrupcoes INT,
  sistemaOperacional VARCHAR(45),
  empresa INT,
  cpuAtivo INT,
  memoriaAtivo INT,
  discoAtivo INT,
  redeAtivo INT,
  CONSTRAINT fk_totem_empresa
    FOREIGN KEY (empresa)
    REFERENCES empresa (idEmpresa));


CREATE TABLE hardware (
  idhardware INT,
  memoriaTotal INT,
  espacoDisco INT,
  velocidadeCpu DOUBLE,
  totem INT,
  PRIMARY KEY (idhardware, totem),
  CONSTRAINT fk_hardware_totem
    FOREIGN KEY (totem)
    REFERENCES totem (idTotem));


CREATE TABLE cpu (
  idCpu INT auto_increment,
  utilizacao DOUBLE,
  horario DATETIME default current_timestamp,
  velocidade DOUBLE,
  qtdProcessos INT,
  hardware INT,
  totem INT,
  PRIMARY KEY (idCpu, hardware, totem),
  CONSTRAINT fk_cpu_hardware1
    FOREIGN KEY (hardware , totem)
    REFERENCES hardware (`idhardware` , `totem`));


CREATE TABLE rede (
  idRede INT auto_increment,
  download DOUBLE,
  upload DOUBLE,
  horario DATETIME default current_timestamp,
  hardware INT,
  totem INT,
  PRIMARY KEY (idRede, hardware, totem),
  CONSTRAINT fk_rede_hardware1
    FOREIGN KEY (hardware, totem)
    REFERENCES hardware (idhardware, totem));


CREATE TABLE memoria (
  idMemoria INT auto_increment,
  emUso DOUBLE,
  horario DATETIME default current_timestamp,
  hardware INT,
  totem INT,
  PRIMARY KEY (idMemoria, hardware, totem),
  CONSTRAINT fk_memoria_hardware
    FOREIGN KEY (hardware, totem)
    REFERENCES hardware (idhardware, totem));


CREATE TABLE disco (
  idDisco INT auto_increment,
  emUso DOUBLE,
  horario DATETIME default current_timestamp,
  hardware INT,
  totem INT,
  PRIMARY KEY (idDisco, hardware, totem),
  CONSTRAINT fk_disco_hardware
    FOREIGN KEY (hardware , totem)
    REFERENCES hardware (idhardware , totem));
    
-- INSERTS PARA TESTES

INSERT INTO empresa (nome, codigoAcesso, contasPermitidas, contasCriadas, email, logradouro, numero, bairro) VALUES
("TotemTech", "abc456789", 9, 2, "totemTech@gmail.com", "Rua haddock Lobo", 591, "Cerqueira Cesar");

INSERT INTO usuario (nome, email, senha, empresa, nivelAcesso) VALUES 
("Gabriel", "gabriel.amaral@sptech.school", "123456", 1, 1),
("Zezinho", "zezinho@gmail.com", "123456", 1, 0);

INSERT INTO totem (nome, email, senha, interrupcoes, sistemaOperacional, empresa, cpuAtivo, memoriaAtivo, discoAtivo, redeAtivo) VALUES
("totem sorvetes", "tsorvetes@gmail.com", "123456", 0, "Linux", 1, 1, 1, 1, 1);

INSERT INTO hardware VALUES
(1, 16, 256, 2.4, 1);

INSERT INTO cpu (utilizacao, velocidade, qtdProcessos, hardware, totem) VALUES
(56.0, 2.2, 286, 1, 1);

INSERT INTO rede (download, upload, hardware, totem) VALUES
(412.00, 50.15, 1, 1);

INSERT INTO memoria (emUso, hardware, totem) VALUES
(12.0, 1, 1);

INSERT INTO disco (emUso, hardware, totem) VALUES 
(128.3, 1, 1); 

-- SELECTS DE TESTE
select * from empresa;
select * from usuario;
select * from totem;
select * from hardware;
select * from cpu;
select * from rede;
select * from memoria;
select * from disco;
SELECT * FROM hardware where totem = 1;

select * from cpu where totem = 1 and hardware = 1;