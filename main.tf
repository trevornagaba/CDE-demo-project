terraform {
  cloud {
    organization = "trevornagaba"
    workspaces {
      name = "cde-lamda-node-tf"
    }
  }
  ## Used to provision infrastrcture; in this case aws
  ## These can be foound in the terraform registry 
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "us-east-2"
}

## Defines specific components of the infrastructure
## Physical, virtual or logical resource like ec2, heroku app etc
## Resource type and name
## Whenever you create a new configuration, you need to terra init to download and install the resource
module "lambda_function_container_image" {
  source = "terraform-aws-modules/lambda/aws"

  function_name = "cde-lambda-node-tf"
  description   = "cde-lambda-node-tf"

  create_package = false
  

  image_uri    = "909417103453.dkr.ecr.us-east-2.amazonaws.com/cde-lamda-node:latest"
  package_type = "Image"
  architectures = ["x86_64"] # ["arm64"]
}