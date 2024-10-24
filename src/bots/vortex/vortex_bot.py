import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from bots.vortex.vortex_login_page import VortexLoginPage
from bots.vortex.vortex_home_page import VortexHomePage
from bots.vortex.vortex_download_page import VortexDownloadPage
from administramosImoveis.src.bots.protel.driver_config import WebDriverConfig
from administramosImoveis.src.bots.protel.utils import DynamoDBQuery, admin_login_list


class VortexBot:
    def __init__(self):
        self.driver = WebDriverConfig.get_firefox_driver(download_dir=r"C:\Users\Jose\Documents\GitHub\administramosImoveis\bots\vortex\downloads", download=True, headless=False)
        self.login_page = VortexLoginPage(self.driver)
        self.home_page = VortexHomePage(self.driver)
        self.download_page = VortexDownloadPage(self.driver)

    def run(self, username, password):
        try:
            if not self.login_page.login(username, password):
                print(f"Login falhou para o usuário {username}. Pulando para o próximo.")
                return
            
            if self.home_page.check_login_success():
                self.home_page.click_segunda_via_boleto()
                boleto_disponivel = self.download_page.check_boleto()

                if boleto_disponivel:
                    pass
            
        finally:
            self.driver.quit()
            print(f"Processo finalizado para o usuário: {username}\n")
    
if __name__ == "__main__":

    query = DynamoDBQuery()
    items = query.getAdminLoginDetails(administradora="vortex")
    login_info = admin_login_list(items)

    print()
    if login_info:
        for id_imobiliaria, username, password, condominio, proprietario, endereco in login_info:
            print(f"Executando o bot para o usuário: {username}")
            bot = VortexBot()
            bot.run(username, password)
    else:
        print("Nenhum login encontrato.")