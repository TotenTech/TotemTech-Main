package controller;
import entities.Totem;
import model.TotemModel;

public class TotemController {

    public static Totem login(String email, String senha) throws Exception {
        try {
            Totem totem = TotemModel.login(email, senha);
            if (totem != null) {
                return totem;
            } else {
                return null;
            }
        } catch (Exception e) {
            throw new Exception("Exceção no controller" + e.getMessage(), e);
        }
    }


//    public static Boolean buscarEmail(String email) throws Exception {
//        try {
//            if (TotemModel.buscarEmail(email)) {
//                return true;
//            } else {
//                return false;
//            }
//        } catch (Exception e) {
//            throw new Exception("Exceção no controller", e);
//        }
//    }
//
//    public static Boolean cadastrar(User usuario) throws Exception {
//        try {
//            if (TotemModel.cadastrar(usuario)) {
//                return true;
//            } else {
//                return false;
//            }
//        } catch (Exception e) {
//            throw new Exception("Exceção no controller", e);
//        }
//    }
//
//    public static Boolean validarEmail(String email) {
//        String regex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
//
//        Pattern pattern = Pattern.compile(regex);
//        Matcher matcher = pattern.matcher(email);
//
//        return matcher.matches();
//    }
//
//    public static Boolean validarCodigoEmpresa(String codigo) throws Exception {
//        return TotemModel.buscarCodigoEmpresa(codigo);
//    }
//
//    public static Boolean validarSenha(String senha, String confirmaSenha) {
//        return senha.equals(confirmaSenha);
//    }
}
