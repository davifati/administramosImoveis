#!/bin/bash

# Atualiza o sistema
sudo apt update -y

# Instala o Python 3, pip e Git
sudo apt install -y python3 python3-pip git

# Verifica se o Python foi instalado corretamente
python3 --version
pip3 --version

if ! python3 --version && ! pip3 --version; then
  echo "Python 3 e pip não foram instalados corretamente." >> /var/log/python_install.log
  exit 1
fi

# (Opcional) Cria um diretório para projetos Python

REPO_URL="https://github.com/limadavida/administramosImoveis"  # Substitua pela URL do repositório
git clone $REPO_URL ~/bots

# Procura por um arquivo requirements.txt e instala as dependências
REQUIREMENTS_FILE=$(find ~/bots -name "requirements.txt" -print -quit)

if [ -f "$REQUIREMENTS_FILE" ]; then
  echo "Arquivo requirements.txt encontrado em: $REQUIREMENTS_FILE"
  pip3 install -r "$REQUIREMENTS_FILE"
  echo "Dependências instaladas com sucesso!"
else
  echo "Arquivo requirements.txt não encontrado."
fi

echo "Finalizando setup!!"
