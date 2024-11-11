import sys
import os

sys.path.append(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
)
from src.protel.bot import ProtelBot
from common.db import MySqlConnector

if __name__ == "__main__":
    query = MySqlConnector()
    items = query.obter_dados("protel")
    login_info = query.organizar_dados_unidade(items)

    if login_info:
        for item in login_info:
            username = item['login']
            password = item['senha']
            endereco = item['endereco_completo']
            num_pasta = item['num_pasta']

            print(f"Executando o bot para o usuário: {username}")
            bot = ProtelBot()
            bot.run(username, password, endereco, num_pasta)
    else:
        print("Nenhum login encontrado.")         
