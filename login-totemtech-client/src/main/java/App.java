import com.github.britooo.looca.api.core.Looca;
import controller.HardwareController;
import controller.TotemController;
import entities.*;

import java.util.Scanner;

public class App {

    static Totem logged = null;
    static Hardware hardware = null;
    static Cpu cpu = null;
    static Memoria memoria = null;
    static Disco disco = null;
    static Rede rede = null;
    static int system;
    static Looca looca = new Looca();

    public static void main(String[] args) throws Exception {

        inicio();

        if (logged != null) {
            System.out.println(logged);
            try {
                if (HardwareController.getHardware(logged.getIdTotem()) != null) {
                    hardware = HardwareController.getHardware(logged.getIdTotem());
                }
            } catch (Exception e) {
                System.out.println("Um erro ocorreu no processo de login, tente novamente mais tarde");
            }
            System.out.println(hardware);
        }

//            Teste reiniciar
//        if (logged) {
//            verificarSo();
//            if (system == 1) {
//                PowerShell prompt = new PowerShell();
//                prompt.restart();
//            } else {
//                TerminalLinux prompt = new TerminalLinux();
//            }
//        }
    }

    public static void inicio() throws Exception {
        Scanner input = new Scanner(System.in);

        int opcao;
        do {
            System.out.println("""
                Bem vindo(a)!
                Digite o número equivalente para escolher uma opção
                1-Entrar || 2-Sair""");

            opcao = input.nextInt();

            switch (opcao) {
                case 1 -> entrar();
                case 2 -> System.exit(0);
                default -> {
                    System.out.println("Escolha uma opção válida!");
                }
            }
        } while (opcao != 1 && opcao != 2);
        input.close();
    }


    public static void entrar() throws Exception {
        Scanner input = new Scanner(System.in);

        System.out.print("Digite seu email: ");
        String inputEmail = input.nextLine();

        System.out.print("Digite sua senha: ");
        String inputSenha = input.nextLine();

        Totem totemLog = TotemController.login(inputEmail, inputSenha);
        if (totemLog != null) {
            System.out.println("Login realizado com sucesso");
            logged = totemLog;
        } else {
            int opcao;
            do {
                System.out.println("""
                    Usuário não encontrado!
                    Digite o número equivalente para escolher uma opção
                    1-Tentar novamente || 2-Sair""");

                opcao = input.nextInt();

                switch (opcao) {
                    case 1 -> entrar();
                    case 2 -> System.exit(0);
                }
            } while (opcao != 1 && opcao != 2);
        }
        input.close();
    }

    public static void verificarSo() {
        String so = System.getProperty("os.name").toLowerCase();

        if (so.contains("win")) {
            system = 1;
        } else {
            system = 2;
        }
    }
}
