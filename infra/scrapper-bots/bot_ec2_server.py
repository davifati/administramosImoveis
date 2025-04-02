import pulumi
import pulumi_aws as aws

git_project_url = "https://github.com/davifati/administramosImoveis.git"

ec2_script = f"""

    #!/bin/bash
    export VAR=VALUE

    echo "Atualizando o sistema..."
    sudo yum update -y

    echo "Instalando Python3, Git e outras ferramentas necessárias..."
    sudo yum install -y python3 git gcc openssl-devel libffi-devel python3-pip

    echo "Criando e ativando ambiente virtual..."
    python3 -m venv venv
    source venv/bin/activate

    echo "Atualizando o pip..."
    sudo pip3 install --upgrade pip

    echo "Instalando Selenium..."
    sudo pip3 install selenium

    echo "Clonando o repositório do Git..."
    cd /
    if ! git clone {git_project_url} bot-server; then
        echo "Erro ao clonar o repositório!"
        exit 1
    fi
    
    cd bot-server/bots
    echo "Diretório atual: $(pwd)"

    if [ -f "requirements.txt" ]; then
        echo "Instalando dependências do requirements.txt..."
        if ! sudo pip3 install -r requirements.txt; then
            echo "Erro ao instalar dependências!"
            exit 1
        fi
    else
        echo "Não foi encontrado o arquivo requirements.txt."
    fi
    

    echo "Executando script de bots..."
    python3 src/run_bots.py >> bots.log 2>&1

"""

key_pair_name = "minha_chave"  # Substitua pelo seu keypair
security_group = aws.ec2.SecurityGroup(
    "ec2-sg",
    description="Segurança EC2",
    ingress=[
        aws.ec2.SecurityGroupIngressArgs(
            from_port=22,
            to_port=22,
            protocol="tcp",
            cidr_blocks=["0.0.0.0/0"],
        )
    ],
    egress=[
        aws.ec2.SecurityGroupEgressArgs(
            from_port=0,
            to_port=0,
            protocol="tcp",
            cidr_blocks=["0.0.0.0/0"],
        )
    ],
)

ec2_instance = aws.ec2.Instance(
    "selenium-instance",
    ami="ami-0c55b159cbfafe1f0",  # Escolha uma AMI barata, como a Amazon Linux 2
    instance_type="t2.micro",  # Instância pequena e barata
    key_name=key_pair_name,
    security_groups=[security_group.name],
    user_data=ec2_script,
    associate_public_ip_address=False,  # Desabilitando o IP público
)

# Saída para pegar o IP da instância
pulumi.export("instance_private_ip", ec2_instance.private_ip)  # IP privado da instância
