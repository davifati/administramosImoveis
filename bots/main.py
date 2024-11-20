import subprocess

bots = [#r"C:\Users\Jose\Documents\GitHub\administramosImoveis\bots\src\apsa\bot.py",
        r"C:\Users\Jose\Documents\GitHub\administramosImoveis\bots\src\estasa\bot.py",
        r"C:\Users\Jose\Documents\GitHub\administramosImoveis\bots\src\protel\app.py",
        r"C:\Users\Jose\Documents\GitHub\administramosImoveis\bots\src\protest\bot.py",
        r"C:\Users\Jose\Documents\GitHub\administramosImoveis\bots\src\quality_house\bot.py",
        r"C:\Users\Jose\Documents\GitHub\administramosImoveis\bots\src\vortex\bot.py"]

for bot_path in bots:
    print(f"Executando {bot_path}...")
    result = subprocess.run(["python", bot_path], capture_output=True, text=True)
    
    # Imprime a saída do bot para o console
    print(result.stdout)
    if result.stderr:
        print(f"Erro ao executar {bot_path}:")
        print(result.stderr)
    
    print(f"Finalizado {bot_path}\n")        
