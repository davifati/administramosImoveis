/*
resource "aws_iam_role" "lambda_execution_role" {
  name = "ProtelBotScraperRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        Effect = "Allow"
        Sid    = ""
      },
    ]
  })
}

resource "aws_iam_policy" "lambda_policy" {
  name        = "ProtelBotScraperPolicy"
  description = "Policy for Notifica Zap Service with S3 and CloudWatch permissions"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:*" # Permissões completas para S3
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "logs:*" # Permissões completas para CloudWatch
        ]
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_policy_attachment" "notifica_zap_service_policy_attachment" {
  name       = "attach-ProtelBotScraperPolicy"
  roles      = [aws_iam_role.lambda_execution_role.name]
  policy_arn = aws_iam_policy.lambda_policy.arn
}

*/
