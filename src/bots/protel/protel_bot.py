import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from bots.protel.protel_login_page import ProtelLoginPage
from bots.protel.protel_home_page import ProtelHomePage
from bots.protel.protel_download_page import ProtelDownloadPage
from common.driver_config import WebDriverConfig
from common.utils import DynamoDBQuery, admin_login_list

class ProtelBot:
    def __init__(self):
        self.download_dir = r"C:\Users\Jose\Documents\GitHub\administramosImoveis\bots\protel\downloads"
        self.driver = WebDriverConfig.get_firefox_driver(download_dir=self.download_dir, download=True, headless=False)
        self.login_page = ProtelLoginPage(self.driver)
        self.home_page = ProtelHomePage(self.driver)
        self.download_page = ProtelDownloadPage(self.driver)

    def run(self, username, password, endereco):
        try:
            if not self.login_page.login(username, password):
                print(f"Login falhou para o usuário {username}. Pulando para o próximo.")
                return
            
            if self.home_page.check_login_success():
                self.home_page.click_boleto()
            
                boleto_disponivel = self.download_page.check_boleto(endereco)

                if boleto_disponivel:
                    print("Download do boleto realizado com sucesso.")
        finally:
            self.driver.quit()
            print(f"Processo finalizado para usuário: {username}.\n")

if __name__ == "__main__":

    query = DynamoDBQuery()
    items = query.getAdminLoginDetails(administradora="protel")
    login_info = admin_login_list(items)

    print()
    if login_info:
        for id_imobiliaria, username, password, condominio, proprietario, endereco in login_info:
            print(f"Executando o bot para o usuário: {username}")
            bot = ProtelBot()
            bot.run(username, password, endereco)
    else:
        print("Nenhum login encontrado.")