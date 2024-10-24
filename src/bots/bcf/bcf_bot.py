import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from bots.bcf.bcf_login_page import BcfLoginPage
from bots.bcf.bcf_home_page import BcfHomePage
from administramosImoveis.src.bots.protel.driver_config import WebDriverConfig
from administramosImoveis.src.bots.protel.utils import DynamoDBQuery, admin_login_list

class BcfBot:
    def __init__(self):
        self.driver = WebDriverConfig.get_firefox_driver(download_dir=r"C:\Users\Jose\Documents\GitHub\administramosImoveis\bots\bcf\downloads", download=False, headless=False)
        self.login_page = BcfLoginPage(self.driver)
        self.home_page = BcfHomePage(self.driver) 

    def run(self, username, password):
        try:
            if not self.login_page.login(username, password):
                print(f"Login falhou para o usuário {username}. Pulando para o próximo.")
                return

            if self.home_page.check_login_success():
                print()
                #self.home_page.click_segunda_via_boleto()
        
        finally:
            print()
            #self.driver.quit()
            #print(f"Processo finalizado para o usuário: {username}.\n")

if __name__ == "__main__":

    query = DynamoDBQuery()
    items = query.getAdminLoginDetails(administradora="bcf")
    login_info = admin_login_list(items)

    print()
    if login_info:
        for id_imobiliaria, username, password in login_info:
            print(f"Executando o bot para o usuário: {username}")
            bot = BcfBot()
            bot.run(username, password)
    else:
        print("Nenhum login encontrado.")

