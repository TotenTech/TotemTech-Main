/*DROP DATABASE totemtech;*/
CREATE DATABASE totemTech;

USE totemTech;

CREATE TABLE empresa(
id int primary key auto_increment,
nome varchar(50),
codigoAcesso varchar(10),
contasPermitidas int,
contasCriadas int,
email varchar(90),
logradouro varchar (70),
numero int,
bairro varchar(90)
)auto_increment = 10000;

CREATE TABLE usuario(
id int primary key auto_increment,
nome varchar(50),
email varchar(80),
senha varchar(12),
empresa int,
foreign key (empresa) references empresa(id)
);

INSERT INTO empresa(nome, codigoAcesso, contasPermitidas, contasCriadas, email, logradouro, numero, bairro) values
("Totem Tech", "1234567890", 10, 1, "totemTech@gmail.com", "Praca da Sé", 50, "Bairro Da Sé");

SELECT id FROM empresa WHERE codigoAcesso = "1234567890";

INSERT INTO Usuario (nome, email, senha, empresa) VALUES
('Tallyon', 'tallyon@gmail.com', '123456', 10000);

SELECT  * FROM usuario;