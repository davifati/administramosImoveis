import sys
import os
import logging

#sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..')))

from bots.src.bap.login_page import BapLoginPage
from bots.src.bap.home_page import BapHomePage
from bots.common.driver_config import WebDriverConfig
from bots.common.utils import DynamoDBQuery, admin_login_list
from datetime import datetime

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

class BapBot:
    def __init__(self):
        current_directory = os.getcwd()
        self.download_dir = os.path.join(current_directory, "downloads")
        self.driver = WebDriverConfig.get_firefox_driver(download_dir=self.download_dir, download=False, headless=False)
        self.login_page = BapLoginPage(self.driver)
        self.home_page = BapHomePage(self.driver)

    def run(self, username, password):
        
        reports = []

        try:
            if not self.login_page.login(username, password):
                self.add_report(reports, f"Login falhou para o usuário: {username}", "FAIL")
                return

            if self.home_page.check_login_success():
                self.add_report(reports, f"Login bem-sucedido para o usuário: {username}", "OK")
                boletos = self.home_page.check_boletos()
                if boletos:
                    self.home_page.get_boleto_info(lista_boletos=boletos, 
                                                   download_dir=self.download_dir, 
                                                   endereco=endereco, 
                                                   idImobiliaria=id_imobiliaria)
                    
                

        
        finally:
            self.driver.quit()
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