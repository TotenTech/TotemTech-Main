package repository;

import model.User;

import java.util.ArrayList;
import java.util.List;

public class MockUsers {

    List<User> users;

    public MockUsers() {
         this.users = new ArrayList();
        this.users.add(new User("gabriel.amaral@sptech.school", "1234567"));
        this.users.add(new User("marayah.pintos@sptech.school", "123456"));
        this.users.add(new User("guilherme.santiago@sptech.school", "12345"));
        this.users.add(new User("julia.cunha@sptech.school", "1234"));
        this.users.add(new User("tallyon.lima@sptech.school", "123"));
    }

    public List<User> getUsers() {
        return users;
    }

    public Boolean addUsers(User usuario) throws Exception {

        for (int i = 0; i < users.size(); i++) {
            if (users.get(i).email.equals(usuario.email)) {
                throw new Exception("Já existe um usuário com este email");
            } else {
                this.users.add(usuario);
                return true;
            }
        }
        return false;
    }

}
