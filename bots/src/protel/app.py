import sys
import os

sys.path.append(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
)
from protel.bot import ProtelBot
from common.utils import DynamoDBQuery, admin_login_list


if __name__ == "__main__":
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
            bot.run(username, password, endereco, id_imobiliaria)
    else:
        print("Nenhum login encontrado.")
