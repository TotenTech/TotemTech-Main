package model;

import entities.Totem;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import repository.local.LocalDatabaseConnection;
import repository.remote.RemoteDatabaseConnection;

import java.util.List;

public class TotemModel {

    static LocalDatabaseConnection dbLocal = new LocalDatabaseConnection();
    static RemoteDatabaseConnection dbRemote = new RemoteDatabaseConnection();
    static JdbcTemplate db;

    public static Totem login(String email, String senha) throws Exception {
//        No momento só estamos utilizando o dbLocal, quando tivermos mais informações criaremos verificações para
//        conectar no local ou remoto
        try {
            db = dbLocal.getConexaoDoBanco();
            List<Totem> listaTotem = db.query("SELECT * FROM totem", new BeanPropertyRowMapper<>(Totem.class));
            for (int i = 0; i < listaTotem.size(); i++) {
                if (listaTotem.get(i).getEmail().equals(email) && listaTotem.get(i).getSenha().equals(senha)) {
                    return listaTotem.get(i);
                }
            }
        } catch (Exception e) {
            throw new Exception("Exceção no model" + e.getMessage(), e);
        }
        return null;
    }


//    Essa lógica era usada para o cadastro, estou deixando comentado pra se alguma hora mudarmos a regra de negócio não
//    termos esse trabalho de novo
//    public static Boolean buscarEmail(String email) throws Exception {
//        List<User> listaUsuarios = usuarios.getUsers();
//        try {
//            for (int i = 0; i < listaUsuarios.size(); i++) {
//                if (listaUsuarios.get(i).email.equals(email)) {
//                    return true;
//                }
//            }
//        } catch (Exception e) {
//            throw new Exception("Exceção no controller", e);
//        }
//        return false;
//    }
//
//    public static Boolean buscarCodigoEmpresa(String codigo) throws Exception {
//        List<Companie> listaEmpresas = empresas.getCompanies();
//        try {
//            for (int i = 0; i < listaEmpresas.size(); i++) {
//                if (listaEmpresas.get(i).codigo.equals(codigo)) {
//                    return true;
//                }
//            }
//        } catch (Exception e) {
//            throw new Exception("Exceção no controller", e);
//        }
//        return false;
//    }
//
//    public static Boolean cadastrar(User usuario) throws Exception {
//        try {
//            if (usuarios.addUsers(usuario)) {
//                return true;
//            }
//        } catch (Exception e) {
//            throw new Exception("Não foi possível cadastrar usuário", e);
//        }
//        return false;
//    }
}