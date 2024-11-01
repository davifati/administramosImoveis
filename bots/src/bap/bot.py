import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from bots.src.bap.login_page import BapLoginPage
from bots.src.bap.home_page import BapHomePage
from bots.common.driver_config import WebDriverConfig
from bots.common.utils import DynamoDBQuery, admin_login_list
from datetime import datetime


class BapBot:
    def __init__(self):
        current_directory = os.getcwd()
        self.download_dir = os.path.join(current_directory, "downloads")
        #self.download_dir = r"C:\Users\Jose\Documents\GitHub\administramosImoveis\bots\src\bap\downloads"
        self.driver = WebDriverConfig.get_firefox_driver(download_dir=self.download_dir, download=False, headless=True)
        self.login_page = BapLoginPage(self.driver)
        self.home_page = BapHomePage(self.driver)

    def run(self, username, password):
        try:
            if not self.login_page.login(username, password):
                print(f"Login falhou para o usuário {username}. Pulando para o próximo.")
                return                
            
            if self.home_page.check_login_success():
                check_boletos = self.home_page.check_boletos()

        
        finally:
            self.driver.quit()
            print(f"Processo finalizado para usuário: {username}\n")

    def add_report(self, reports, msg, status):
        reports.append({
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "msg": msg,
            "status": status
        })     

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