provider "aws" {
  region                   = "us-east-1"
  shared_config_files      = ["conf"]
  shared_credentials_files = ["creds"]
}

resource "aws_vpc" "jenkins_vpc" {
  cidr_block = "10.0.0.0/16"
}
resource "aws_subnet" "jenkins_subnet" {
  vpc_id     = aws_vpc.jenkins_vpc.id
  cidr_block = "10.0.1.0/24"
}
resource "aws_internet_gateway" "jenkins_igw" {
  vpc_id = aws_vpc.jenkins_vpc.id
}
resource "aws_route_table" "jenkins_rt" {
  vpc_id = aws_vpc.jenkins_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.jenkins_igw.id
  }
}

resource "aws_route_table_association" "jenkins_rta" {
  subnet_id      = aws_subnet.jenkins_subnet.id
  route_table_id = aws_route_table.jenkins_rt.id
}
resource "aws_security_group" "jenkins_sg" {
  vpc_id = aws_vpc.jenkins_vpc.id
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
resource "aws_instance" "jenkins_instance" {
  ami             = "ami-08982f1c5bf93d976" # Amazon Linux 2 AMI (HVM), SSD Volume Type
  instance_type   = "t2.micro"
  subnet_id       = aws_subnet.jenkins_subnet.id
  security_groups = [aws_security_group.jenkins_sg.id]
  tags = {
    Name = "jenkins_instance"
  }
  associate_public_ip_address = true
  key_name  = var.key_name
  user_data = <<-EOF
              #!/bin/bash
              apt-get update -y
              EOF
}
resource "local_file" "ansible_inventory" {
  content  = <<EOT
[jenkins]
${aws_instance.jenkins_instance.public_ip} ansible_user=ec2-user ansible_ssh_private_key_file=~/.aws/labs_key.pem

EOT
  filename = "${path.module}/../ansible/inventory.ini"
}
resource "null_resource" "ansible_provision" {
  triggers = {
    instance_ip = aws_instance.jenkins_instance.public_ip
  }

  provisioner "local-exec" {
    command = "ansible-playbook -i ../ansible/inventory.ini jenkins -m ping"
  }
}