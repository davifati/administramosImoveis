import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from src.bap.login_page import BapLoginPage
from src.bap.home_page import BapHomePage
from common.driver_config import WebDriverConfig
from common.utils import DynamoDBQuery, admin_login_list


class BapBot:
    def __init__(self):
        self.download_dir = r"C:\Users\Jose\Documents\GitHub\administramosImoveis\bots\src\bap\downloads"
        self.driver = WebDriverConfig.get_firefox_driver(download_dir=self.download_dir, download=False, headless=False)
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

    '''query = DynamoDBQuery()
    items = query.getAdminLoginDetails(administradora="bap")
    login_info = admin_login_list(items)'''
    
    login_info = [
        ("165",
         "204730039",
         "6707",
         "Porto Fino - Mediterraneo",
         "SILVIA HELENA DE BRITO PAVEL",
         "Av Gastao Senges, 327, apto 507 - Barra da Tijuca - Cep 22631-280 ")
    ]

    print()
    if login_info:
        for id_imobiliaria, username, password, condominio, proprietario, endereco in login_info:
            print(f"Executando o bot para o usuário: {username}")
            bot = BapBot()
            bot.run(username, password)
    else:
        print("Nenhum login encontrado.")    