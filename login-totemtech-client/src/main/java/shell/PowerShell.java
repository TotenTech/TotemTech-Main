package shell;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class PowerShell {
    public static void main(String[] args) {
        try {
            // Comando PowerShell para obter informações sobre a memória
            String powerShellCommand = "powershell.exe (Get-WmiObject Win32_OperatingSystem).TotalVisibleMemorySize, (Get-WmiObject Win32_OperatingSystem).FreePhysicalMemory";
            String[] memoryInfo = executePowerShellCommand(powerShellCommand).split("\n");

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

    public static String executePowerShellCommand(String command) throws IOException, InterruptedException {
        Process process = Runtime.getRuntime().exec(command);
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

//    double memoriaDisponivel() {
//
//    }

    public void restart() {
        try {
            executePowerShellCommand("powershell.exe (Restart-Computer)");
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
