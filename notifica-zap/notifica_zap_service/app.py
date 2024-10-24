import json
import requests
from typing import Any
import time
import os


class MissingParameterException(Exception):
    pass


envvars = {
    "ZAP_API_TOKEN": os.getenv("ZAP_API_TOKEN"),
    "ZAP_API_URL": os.getenv("ZAP_API_URL"),
}

missing_vars = [var for var, value in envvars.items() if value is None]
if missing_vars:
    raise MissingParameterException(
        f"As seguintes variáveis de ambiente estão ausentes: {', '.join(missing_vars)}."
    )


def send_zap(number: str, message: str) -> dict[str, Any]:
    headers = {
        "Authorization": f"Bearer {envvars['ZAP_API_TOKEN']}",
        "Content-Type": "application/json",
    }
    body = {"number": str(number), "body": str(message)}
    print(f"Request Body: {body}")

    try:
        response = requests.post(envvars["ZAP_API_URL"], json=body, headers=headers)
    except requests.exceptions.HTTPError as e:
        print(f"Error response: {e.response.text}")
        raise
    return {"statusCode": response.status_code, "body": response.text}


def lambda_handler(event, _) -> dict[str, Any]:
    print("event: ", event)
    try:
        number = event.get("number", None)
        message = event.get("message", None)

        if number is None and message is None:
            raise MissingParameterException(
                "Os parâmetros 'number' e 'message' são necessários."
            )

        start_time = time.time()
        response = send_zap(number=number, message=message)

        elapsed_time = time.time() - start_time
        print(f"Time taken for request: {elapsed_time:.2f} seconds")
        return response

    except MissingParameterException as e:
        return {"statusCode": 400, "body": json.dumps({"error": str(e)})}

    except requests.exceptions.RequestException as e:
        return {
            "statusCode": 500,
            "body": json.dumps(
                {"error": "Erro ao enviar a mensagem.", "details": str(e)}
            ),
        }


if __name__ == "__main__":
    test_event = {"number": "5571986080639", "message": "protel basic msg"}
    # response = send_zap(test_event["number"], test_event["message"])
    response = lambda_handler(event=test_event, _=None)
    print(response)
