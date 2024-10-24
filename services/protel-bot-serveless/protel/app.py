import json
from common.utils import DynamoDBQuery, admin_login_list
from protel_bot import ProtelBot


def lambda_handler(event, context):
    query = DynamoDBQuery()

    items = query.getAdminLoginDetails(administradora="protel")
    login_info = admin_login_list(items)

    print()
    if login_info:
        for (
            id_imobiliaria,
            username,
            password,
            condominio,
            proprietario,
            endereco,
        ) in login_info:
            print(f"Executando o bot para o usuário: {username}")
            bot = ProtelBot()
            bot.run(username, password, endereco)
    else:
        print("Nenhum login encontrado.")

    return {"statusCode": 200, "body": json.dumps("Processamento concluído.")}
