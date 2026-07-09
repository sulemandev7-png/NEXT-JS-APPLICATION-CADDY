provider "aws" {
    profile="default"
    region="ap-south-1"
}
resource "aws_instance" "EC2-INSTANCE"{
    ami = "ami-07216ac99dc46a187"
    instance_type = "t3.micro"

    tags = {
        Name="Myterraforminstance"
    }
}