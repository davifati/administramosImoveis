import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from bots.src.bcf.login_page import BcfLoginPage
from bots.src.bcf.home_page import BcfHomePage
from bots.common.driver_config import WebDriverConfig
from bots.common.utils import DynamoDBQuery, admin_login_list

class BcfBot:
    def __init__(self):
        current_directory = os.getcwd()
        self.download_dir = os.path.join(current_directory, "downloads")
        self.driver = WebDriverConfig.get_firefox_driver(download_dir=self.download_dir, download=False, headless=True)
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

