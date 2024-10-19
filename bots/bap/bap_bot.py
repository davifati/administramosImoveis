import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from bots.bap.bap_login_page import BapLoginPage
from bots.bap.bap_home_page import BapHomePage
from common.driver_config import WebDriverConfig
from common.utils import DynamoDBQuery, admin_login_list


class BapBot:
    def __init__(self):
        self.driver = WebDriverConfig.get_firefox_driver(download_dir=r"C:\Users\Jose\Documents\GitHub\administramosImoveis\bots\bap\downloads", download=True, headless=False)
        self.login_page = BapLoginPage(self.driver)
        self.home_page = BapHomePage(self.driver)

    def run(self, username, password):
        try:
            if not self.login_page.login(username, password):
                print(f"Login falhou para o usuário {username}. Pulando para o próximo.")
                return                
            
            if self.home_page.check_login_success():
                pass
        
        finally:
            #self.driver.quit()
            print(f"Processo finalizado para usuário: {username}\n")

if __name__ == "__main__":

    query = DynamoDBQuery()
    items = query.getAdminLoginDetails(administradora="bap")
    login_info = admin_login_list(items)
    
    print()
    if login_info:
        for id_imobiliaria, username, password, condominio, proprietario, endereco in login_info:
            print(f"Executando o bot para o usuário: {username}")
            bot = BapBot()
            bot.run(username, password)
    else:
        print("Nenhum login encontrado.")    