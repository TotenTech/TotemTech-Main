package controller;
import model.User;
import model.UserModel;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UserController {

    public static Boolean buscarUsuario(User usuario) throws Exception {
        try {
            if (UserModel.buscarUsuario(usuario)) {
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            throw new Exception("Exceção no controller", e);
        }
    }

    public static Boolean cadastrar(User usuario) throws Exception {
        try {
            if (UserModel.cadastrar(usuario)) {
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            throw new Exception("Exceção no controller", e);
        }
    }

    public static Boolean validarEmail(String email) {
        String regex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";

        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(email);

        return matcher.matches();
    }

    public static Boolean validarSenha(String senha, String confirmaSenha) {
        return senha.equals(confirmaSenha);
    }
}
