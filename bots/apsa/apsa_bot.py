import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from bots.apsa.apsa_login_page import ApsaLoginPage
from common.driver_config import WebDriverConfig
from common.utils import DynamoDBQuery, admin_login_list

class ApsaBot:
    def __init__(self):
        self.driver = WebDriverConfig.get_firefox_driver(download_dir=r"C:\Users\Jose\Documents\GitHub\administramosImoveis\bots\apsa\downloads", headless=True)
        self.login_page = ApsaLoginPage(self.driver)

    def run(self, username, password):
        try:
            if not self.login_page.login(username, password):
                print(f"Login falhou para o usuário {username}. Pulando para o próximo.")
                return
        
        finally:
            self.driver.quit()
            print(f"Processo finalizado para usuário: {username}\n")

if __name__ == "__main__":

    query = DynamoDBQuery()
    items = query.getAdminLoginDetails(administradora="APSA (login: 32179787 senha 123456)")
    login_info = admin_login_list(items)

    print()
    if login_info:
        for id_imobiliaria, username, password in login_info:
            print(f"Executando o bot para o usuário: {username}")
            bot = ApsaBot()
            bot.run(username, password)
    else:
        print("Nenhum login encontrado.")