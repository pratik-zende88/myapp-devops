terraform {
  backend "s3" {
    bucket = "task-tracker-terraform-state-968234051261"
    key    = "task-tracker/terraform.tfstate"
    region = "ap-south-1"
  }
}