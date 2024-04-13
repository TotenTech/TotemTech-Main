package shell;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class PowerShell {
//    TODO: Classe para comandos linux que serão executados
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

    public void restart() {
        try {
            executePowerShellCommand("powershell.exe (Restart-Computer)");
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
