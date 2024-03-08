import controller.UserController;
import model.User;
import java.util.Scanner;

public class Main {

    public static int login = 0;

    public static void main(String[] args) throws Exception {

        inicio();
    }

    public static void inicio() throws Exception {
        Scanner input = new Scanner(System.in);

        int opcao;
        do {
            System.out.println("""
                Bem vindo(a)!
                Digite o número equivalente para escolher uma opção
                1-Entrar || 2-Cadastrar-se || 3-Sair""");

            opcao = input.nextInt();

            switch (opcao) {
                case 1 -> entrar();
                case 2 -> cadastrar();
                case 3 -> System.exit(0);
                default -> {
                    System.out.println("Escolha uma opção válida!");
                }
            }
        } while (opcao != 1 && opcao != 2 && opcao != 3);
        input.close();
    }

    public static void cadastrar() throws Exception {
        Scanner input = new Scanner(System.in);

        String inputEmail;
        do {
            System.out.print("Digite seu email: ");
            inputEmail = input.nextLine();

            if (!UserController.validarEmail(inputEmail)) {
                System.out.println("Insira um email válido");
            }
        } while (!UserController.validarEmail(inputEmail));

        String inputSenha;
        String inputConfirmaSenha;
        do {
            System.out.print("Digite sua senha: ");
            inputSenha = input.nextLine();

            System.out.println("Confirme sua senha: ");
            inputConfirmaSenha = input.nextLine();

            if (!UserController.validarSenha(inputSenha, inputConfirmaSenha)) {
                System.out.println("As senhas devem ser iguais!");
            }
        } while (!UserController.validarSenha(inputSenha, inputConfirmaSenha));

        if (UserController.cadastrar(new User(inputEmail, inputSenha))) {
            System.out.println("""
                    Cadastro realizado com sucesso!
                    """);

            int opcao;
            do {
                System.out.print("""
                        Digite o número equivalente para escolher uma opção
                        1-Fazer login || 2-Sair""");

                opcao = input.nextInt();

                switch (opcao) {
                    case 1 -> entrar();
                    case 2 -> System.exit(0);
                    default -> System.out.println("Escolha uma opção válida");
                }
            } while (opcao != 1 && opcao != 2);

        } else {
            int opcao;

            do {
                System.out.println("""
                    Já existe uma conta com este email
                    Digite o número equivalente para escolher uma opção
                    1-Tentar novamente || 2-Fazer login || 2-Sair""");

                opcao = input.nextInt();

                switch (opcao) {
                    case 1 -> inicio();
                    case 2 -> entrar();
                    case 3 -> System.exit(0);
                    default -> {
                        System.out.println("Escolha uma opção válida!");
                    }
                }
            } while (opcao != 1 && opcao != 2 && opcao != 3);
        }
        input.close();
    }

    public static void entrar() throws Exception {
        Scanner input = new Scanner(System.in);

        System.out.print("Digite seu email: ");
        String inputEmail = input.nextLine();

        System.out.print("Digite sua senha: ");
        String inputSenha = input.nextLine();

        if (UserController.buscarUsuario(new User(inputEmail, inputSenha))) {
            System.out.println("Login realizado com sucesso");
            login = 1;
        } else {
            int opcao;
            do {
                System.out.println("""
                    Usuário não encontrado!
                    Digite o número equivalente para escolher uma opção
                    1- Tentar novamente || 2-Cadastrar-se || 3-Sair""");

                opcao = input.nextInt();

                switch (opcao) {
                    case 1 -> entrar();
                    case 2 -> cadastrar();
                    case 3 -> System.exit(0);
                }
            } while (opcao != 1 && opcao != 2 && opcao != 3);
        }
        input.close();
    }
}
