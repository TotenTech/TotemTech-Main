public class Main {
    public static void main(String[] args) {

    }
    public static void capturarDados(Integer opcao) {
         loo=new Looca();

        switch (opcao) {
            case 1:
                Sistema sistema = looca.getSistema();
                System.out.println(sistema);
                break;

            case 2:
                Temperatura temperatura = looca.getTemperatura();
                System.out.println(temperatura);
                break;

        }
    }