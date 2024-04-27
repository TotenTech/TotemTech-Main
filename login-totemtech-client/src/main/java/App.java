import com.github.britooo.looca.api.core.Looca;
import controller.CpuController;
import controller.DiscoController;
import controller.MemoriaController;
import controller.TotemController;
import entities.*;
import model.MemoriaModel;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Scanner;

public class App {

    static Totem logged = null;
    static Interrupcoes interrupcoes = null;
    static Cpu cpu = null;
    static Memoria memoria = null;
    static List<Disco> discos = null;
    static Rede rede = null;
    static int system;
    static Looca looca = new Looca();

    public static void main(String[] args) throws Exception {

        DecimalFormat decimal = new DecimalFormat("#.##");
        System.out.println(looca.getGrupoDeDiscos().getDiscos().get(0).getSerial());
        inicio();

        if (logged != null) {
            System.out.println(logged);
            try {
                cpu = CpuController.getCpu(logged.getIdTotem());
                if (!(cpu != null)) {
                    cpu = new Cpu("Ghz", (looca.getProcessador().getFrequencia().doubleValue() / 1000000000), 1);
                    CpuController.insertCpu(cpu, logged.getIdTotem());
                }

                memoria = MemoriaController.getMemoria(logged.getIdTotem());
                if (!(memoria != null)) {
                    memoria = new Memoria(Double.parseDouble(decimal.format(looca.getMemoria().getTotal().doubleValue() / 1073741824)), "Gb", 1);
                    MemoriaModel.insertMemoria(memoria, logged.getIdTotem());
                }

                discos = DiscoController.getDiscos(logged.getIdTotem());
                if (!(discos != null)) {
                    List<com.github.britooo.looca.api.group.discos.Disco> d = looca.getGrupoDeDiscos().getDiscos();
                    for (int i = 0; i < d.size(); i++) {
                        Disco di = new Disco(looca.getGrupoDeDiscos().getDiscos().get(i).getModelo(), Double.parseDouble(decimal.format(looca.getGrupoDeDiscos().getDiscos().get(i).getTamanho() / 1073741824)), "Gb", logged.getIdTotem());
                        discos.add(di);
                        DiscoController.insertDisco(di);
                    }
                }
                System.out.println(discos);
                System.out.println(cpu.toString());
                System.out.println(memoria.toString());
            } catch (Exception e) {
                System.out.println("Um erro ocorreu no processo de login, tente novamente mais tarde");
            }
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

        System.out.print("Digite seu login: ");
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
