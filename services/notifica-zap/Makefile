# Define variáveis
ZIP_FILE = notifica_zap_service.zip
SOURCE_DIR = notifica_zap_service
REQUIREMENTS_FILE = requirements.txt
VENV_DIR = .venv
INFRA_DIR = infra
LAYER_ZIP = layer.zip
PKG_DIR = ./pkg

#: FOLDER LAYER MANDATORY: ./python

deploy: zip tfinit tfapply

zip:
	@echo "Instalando dependências para o layer em $(PKG_DIR)/python..."
	pip3 install -r $(SOURCE_DIR)/$(REQUIREMENTS_FILE) -t ./python

	@echo "Zipando o layer do lambda em $(LAYER_ZIP)..."
	zip -r $(LAYER_ZIP) ./python/*

	@echo "Zipando a função do lambda em $(ZIP_FILE)..."
	zip -r $(ZIP_FILE) $(SOURCE_DIR)/* -x "*$(VENV_DIR)*"


tfinit:
	@echo "Inicializando o Terraform no diretório $(INFRA_DIR)..."
	cd $(INFRA_DIR) && terraform fmt && terraform init && terraform plan 


# Regra para aplicar o Terraform
tfapply:
	@echo "Aplicando a configuração do Terraform..."
	cd $(INFRA_DIR) && terraform apply

tfdestroy:
	@echo "Destruindo a configuração do Terraform..."
	cd $(INFRA_DIR) && terraform destroy


# Regra para limpar o diretório
clean:
	@echo "Limpando arquivos..."
	rm -rf $(ZIP_FILE) $(VENV_DIR) $(LAYER_ZIP) ./python

# Ajuda
help:
	@echo "Comandos disponíveis:"
	@echo "  make zip     - Empacotar a função Lambda em um arquivo ZIP"
	@echo "  make clean   - Remover o arquivo ZIP gerado"
	@echo "  make help    - Exibir esta mensagem de ajuda"
