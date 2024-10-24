output "NotificaZapFunction" {
  value       = aws_lambda_function.notifica_zap_service.arn
  description = "Notifica Zap Lambda Function ARN"
}

output "NotificaZapFunctionIamRole" {
  value       = aws_iam_role.lambda_execution_role.arn
  description = "Implicit IAM Role created for Notifica Zap function"
}

output "NotificaZapFunctionApiUrl" {
  value       = aws_lambda_function_url.api_url.function_url
  description = "Function Api URL for Notifica Zap Service"
}
