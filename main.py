import subprocess
import os

# Lista de bots com caminhos absolutos
bots = [
    #"/home/administramosImoveis/bots/src/apsa/bot.py"
    #"/home/administramosImoveis/bots/src/estasa/bot.py"
    "/home/administramosImoveis/bots/src/protel/bot.py",
    "/home/administramosImoveis/bots/src/protest/bot.py",
    "/home/administramosImoveis/bots/src/quality_house/bot.py",
    "/home/administramosImoveis/bots/src/vortex/bot.py"
]

# Diretório para logs
log_dir = "/var/log/bots"

# Certifique-se de que o diretório de logs existe
os.makedirs(log_dir, exist_ok=True)

for bot_path in bots:
    log_file = os.path.join(log_dir, f"{bot_path.split('/')[-2]}.log")  # Nome do log baseado no nome do diretório do bot
    print(f"Executando {bot_path}... Log em {log_file}")
    
    try:
        # Executa o bot com saída em tempo real
        with subprocess.Popen(
            ["python3.12", bot_path],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True
        ) as process, open(log_file, "w") as log:
            for line in process.stdout:
                print(line, end="")  # Exibe a saída no console
                log.write(line)  # Escreve a saída no arquivo de log
    except Exception as e:
        print(f"Erro ao executar {bot_path}: {e}")
    print(f"Finalizado {bot_path}\n")
