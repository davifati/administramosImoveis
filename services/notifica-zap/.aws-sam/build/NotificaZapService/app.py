import json
import requests
from typing import Any


class MissingParameterException(Exception):
    pass


ZAP_API_URL = "https://gridchatapi.gridwebti.com.br/api/messages/send"


def lambda_handler(event, _) -> dict[str, Any]:
    try:
        number = event.get("number", None)
        message = event.get("message", None)

        if number is None and message is None:
            raise MissingParameterException(
                "Os parâmetros 'number' e 'message' são necessários."
            )

        body = {"number": str(number), "body": str(message)}

        response = requests.post(ZAP_API_URL, json=body)
        response.raise_for_status()

        return {"statusCode": response.status_code, "body": response.text}

    except MissingParameterException as e:
        return {"statusCode": 400, "body": json.dumps({"error": str(e)})}

    except requests.exceptions.RequestException as e:
        return {
            "statusCode": 500,
            "body": json.dumps(
                {"error": "Erro ao enviar a mensagem.", "details": str(e)}
            ),
        }
