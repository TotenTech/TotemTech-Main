package model;

import repository.MockCompanies;
import repository.MockUsers;

import java.util.List;

public class UserModel {

    static MockUsers usuarios = new MockUsers();
    static MockCompanies empresas = new MockCompanies();

    public static Boolean buscarUsuario(User usuario) throws Exception {
        List<User> listaUsuarios = usuarios.getUsers();
        try {
            for (int i = 0; i < listaUsuarios.size(); i++) {
                if (listaUsuarios.get(i).email.equals(usuario.email) && listaUsuarios.get(i).senha.equals(usuario.senha)) {
                    return true;
                }
            }
        } catch (Exception e) {
            throw new Exception("Exceção no controller", e);
        }
        return false;
    }

    public static Boolean buscarEmail(String email) throws Exception {
        List<User> listaUsuarios = usuarios.getUsers();
        try {
            for (int i = 0; i < listaUsuarios.size(); i++) {
                if (listaUsuarios.get(i).email.equals(email)) {
                    return true;
                }
            }
        } catch (Exception e) {
            throw new Exception("Exceção no controller", e);
        }
        return false;
    }

    public static Boolean buscarCodigoEmpresa(String codigo) throws Exception {
        List<Companie> listaEmpresas = empresas.getCompanies();
        try {
            for (int i = 0; i < listaEmpresas.size(); i++) {
                if (listaEmpresas.get(i).codigo.equals(codigo)) {
                    return true;
                }
            }
        } catch (Exception e) {
            throw new Exception("Exceção no controller", e);
        }
        return false;
    }

    public static Boolean cadastrar(User usuario) throws Exception {
        try {
            if (usuarios.addUsers(usuario)) {
                return true;
            }
        } catch (Exception e) {
            throw new Exception("Não foi possível cadastrar usuário", e);
        }
        return false;
    }
}
