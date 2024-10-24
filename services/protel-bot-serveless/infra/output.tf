output "LambdaApiUrl" {
  value       = aws_lambda_function_url.api_url.function_url
  description = "Function Api URL for Notifica Zap Service"
}
