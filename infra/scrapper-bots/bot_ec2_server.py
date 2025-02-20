import pulumi
import pulumi_aws as aws


ec2_script = f"""

    #!/bin/bash

    echo "Atualizando o sistema..."
    sudo yum update -y

    echo "Instalando Python3, Git e pip..."
    sudo yum install -y python3 git

    echo "Instalando Selenium..."
    sudo pip3 install selenium

    echo "Clonando o repositório do Git..."
    git clone https://github.com/SEU_REPOSITORIO.git /home/ec2-user/selenium-project

    cd /home/ec2-user/selenium-project
    echo "Diretório do repositório: $(pwd)"

    if [ -f "requirements.txt" ]; then
        echo "Instalando dependências do requirements.txt..."
        sudo pip3 install -r requirements.txt
    else
        echo "Não foi encontrado o arquivo requirements.txt."
    fi

    # run bots...
    # echo "Executando script de bots..."
    # python3 selenium_script.py

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

# Criando a instância EC2
ec2_instance = aws.ec2.Instance(
    "selenium-instance",
    ami="ami-0c55b159cbfafe1f0",  # Escolha uma AMI barata, como a Amazon Linux 2
    instance_type="t2.micro",  # Instância pequena e barata
    key_name=key_pair_name,
    security_groups=[security_group.name],
    user_data=ec2_script,
)

# Saída para pegar o IP da instância
pulumi.export("instance_ip", ec2_instance.public_ip)
