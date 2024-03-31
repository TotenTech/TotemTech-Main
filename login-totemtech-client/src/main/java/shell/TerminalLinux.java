package shell;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class TerminalLinux {
    public static void main(String[] args) {
        try {
            // Comando de terminal Linux para obter informações sobre a memória
            String linuxCommand = "free -m | grep Mem | awk '{print $2\" \"$4}'";
            String[] memoryInfo = executeLinuxCommand(linuxCommand).split("\\s+");

            // Convertendo valores de string para int
            int totalMemory = Integer.parseInt(memoryInfo[0].trim());
            int freeMemory = Integer.parseInt(memoryInfo[1].trim());

            // Calculando a porcentagem de memória livre
            double freeMemoryPercentage = ((double) freeMemory / totalMemory) * 100;

            System.out.println("Free Memory Percentage: " + freeMemoryPercentage + "%");
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    public static String executeLinuxCommand(String command) throws IOException, InterruptedException {
        Process process = Runtime.getRuntime().exec(new String[]{"bash", "-c", command});
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        StringBuilder output = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            output.append(line).append("\n");
        }
        process.waitFor();
        process.destroy();
        return output.toString();
    }
}
