variable "cluster_name" {
  description = "EKS cluster name"
  type        = string
  default     = "task-tracker-cluster"
}

variable "region" {
  description = "AWS region"
  type        = string
  default     = "ap-south-1"
}

variable "kubernetes_version" {
  description = "Kubernetes version"
  type        = string
  default     = "1.33"
}

variable "node_instance_type" {
  description = "EC2 worker node instance type"
  type        = string
  default     = "c7i-flex.large"
}