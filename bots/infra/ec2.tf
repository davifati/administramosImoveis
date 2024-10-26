resource "aws_instance" "my_ec2_instance" {

  ami           = "ami-0dd9f0b6e1d3c2f5f" # Ubuntu 20.04 LTS
  instance_type = "t2.micro"

  key_name  = "your-key-pair"  # substitua pelo seu par de chaves
  user_data = file("setup.sh") # aponta para o script shell

  iam_instance_profile = aws_iam_role.ec2_role.name # associa a role

  tags = {
    Name = "RPA - AdministramosImoveis"
  }
}
