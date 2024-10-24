resource "aws_lambda_layer_version" "notifica_zap_service_layer" {
  layer_name          = "NotificaZapServiceLayer"
  compatible_runtimes = ["python3.11"]
  filename            = "../layer.zip"

  source_code_hash = filebase64sha256("../layer.zip")
}


resource "aws_lambda_function" "notifica_zap_service" {
  function_name = "NotificaZapService"
  handler       = "notifica_zap_service.app.lambda_handler"
  runtime       = "python3.11"
  timeout       = 600
  role          = aws_iam_role.lambda_execution_role.arn
  filename      = "../notifica_zap_service.zip"

  source_code_hash = filebase64sha256("../notifica_zap_service.zip")

  layers = [
    aws_lambda_layer_version.notifica_zap_service_layer.arn
  ]

  environment {
    variables = {
      ZAP_API_TOKEN = var.zap_token_api
      ZAP_API_URL   = var.zap_url_api
    }
  }
}

resource "aws_lambda_function_url" "api_url" {
  function_name      = aws_lambda_function.notifica_zap_service.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["*"]
    allow_headers     = ["date", "keep-alive"]
    expose_headers    = ["keep-alive", "date"]
    max_age           = 86400
  }
}
