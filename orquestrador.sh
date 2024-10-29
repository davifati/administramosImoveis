#!/bin/bash

# Defina o diretório base
base_dir="bots/src"

# Lista de diretórios que você deseja percorrer
directories=("apsa" "bap" "bcf" "cipa" "estasa" "protel" "protest" "quality_house" "vortex")

# Crie ou limpe o arquivo de log
log_file="rpa.log"
> "$log_file"  # Limpa o arquivo se já existir

# Loop pelos diretórios
for dir in "${directories[@]}"; do
    if [ -d "$base_dir/$dir" ]; then
        echo "Executando arquivos em $dir..." | tee -a "$log_file"
        # Loop por arquivos bot.py no diretório
        for file in "$base_dir/$dir"/bot.py; do
            if [ -f "$file" ]; then
                echo "Executando $file" | tee -a "$log_file"
                python "$file" >> "$log_file" 2>&1  # Redireciona a saída e erros para o log
            else
                echo "Nenhum arquivo bot.py encontrado em $dir" | tee -a "$log_file"
            fi
        done
    else
        echo "Diretório $dir não encontrado." | tee -a "$log_file"
    fi
done
