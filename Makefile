# Define o diretório onde o Terraform está localizado
INFRA_DIR = infra

# Define o comando Terraform
TERRAFORM = terraform

.PHONY: init plan apply destroy

# Inicializa o Terraform
init:
	@echo "Inicializando o Terraform..."
	cd $(INFRA_DIR) && $(TERRAFORM) init

# Planeja a execução do Terraform
plan:
	@echo "Gerando plano do Terraform..."
	cd $(INFRA_DIR) && $(TERRAFORM) plan

# Aplica a configuração do Terraform
apply:
	@echo "Aplicando configuração do Terraform..."
	cd $(INFRA_DIR) && $(TERRAFORM) apply

# Destrói os recursos gerenciados pelo Terraform
destroy:
	@echo "Destruindo recursos do Terraform..."
	cd $(INFRA_DIR) && $(TERRAFORM) destroy

# Executa todos os passos: init, plan e apply
all: init plan apply
