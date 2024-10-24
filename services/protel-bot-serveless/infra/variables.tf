variable "aws_access_key" {
  description = "AWS access key"
  type        = string
  default     = "AKIA2OAJT7MORDQSHXOW" # root
}

variable "aws_secret_key" {
  description = "AWS secret key"
  type        = string
  default     = "vBFyHo+2jwmWwcyhwLb2DN89B4zr0Ty9hefXR/i0" # root
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "zap_token_api" {
  description = "AWS region"
  type        = string
  default     = "20240823001"
}

variable "zap_url_api" {
  description = "AWS region"
  type        = string
  default     = "https://gridchatapi.gridwebti.com.br/api/messages/send"
}


