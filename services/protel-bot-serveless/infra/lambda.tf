# Faz upload do arquivo layer.zip para o S3
resource "aws_s3_object" "lambda_layer_zip" {
  bucket = "bot-layers"
  key    = "general/layer.zip"
  source = "../layer.zip" # Caminho local para o arquivo zip
}


# Cria a camada Lambda a partir do arquivo S3
resource "aws_lambda_layer_version" "lambda_layer" {
  layer_name          = "ProtelLayer"
  compatible_runtimes = ["python3.11"]
  s3_bucket           = "bot-layers"
  s3_key              = aws_s3_object.lambda_layer_zip.key

  source_code_hash = filebase64sha256(aws_s3_object.lambda_layer_zip.source)
}


resource "aws_lambda_function" "lambda_function" {
  function_name = "protelBotScraper"
  handler       = "protel.app.lambda_handler"
  runtime       = "python3.11"
  timeout       = 600
  #role          = aws_iam_role.lambda_execution_role.arn
  role     = "arn:aws:iam::717279722269:role/bot-scraper-role"
  filename = "../protel.zip"

  source_code_hash = filebase64sha256("../protel.zip")

  layers = [
    aws_lambda_layer_version.lambda_layer.arn
  ]

  environment {
    variables = {
      ZAP_API_TOKEN = var.zap_token_api
      ZAP_API_URL   = var.zap_url_api
    }
  }
}

resource "aws_lambda_function_url" "api_url" {
  function_name      = aws_lambda_function.lambda_function.function_name
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
