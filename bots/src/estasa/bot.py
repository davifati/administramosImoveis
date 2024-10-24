import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from administramosImoveis.bots.estasa.login_page import EstasaLoginPage
from administramosImoveis.bots.estasa.home_page import EstasaHomePage
from administramosImoveis.bots.estasa.download_page import EstasaDownloadPage
from administramosImoveis.src.bots.protel.driver_config import WebDriverConfig
from administramosImoveis.src.bots.protel.utils import DynamoDBQuery, admin_login_list

class EstasaBot():
    def __init__(self):
        self.driver = WebDriverConfig.get_firefox_driver(download_dir=r"C:\Users\Jose\Documents\GitHub\administramosImoveis\bots\estasa\downloads", headless=False)
        self.login_page = EstasaLoginPage(self.driver)
        self.home_page = EstasaHomePage(self.driver)
        self.download_page = EstasaDownloadPage(self.driver)

    def run(self, username, password):
        try:
            if not self.login_page.login(username, password):
                print(f"Login falhou para o usuário {username}. Pulando para o próximo.")
                return

            if self.home_page.check_login_success():
                self.home_page.click_segunda_via_boleto()

                boleto_disponivel = self.download_page.check_boleto()

                if boleto_disponivel:
                    print("Download do boleto realizado com sucesso.")

        finally:
            #self.driver.quit()
            print(f"Processo finalizado para usuário: {username}.\n")

if __name__ == "__main__":

    query = DynamoDBQuery()
    items = query.getAdminLoginDetails(administradora="estasa")
    login_info = admin_login_list(items)

    print()
    if login_info:
        for id_imobiliaria, username, password, condominio, proprietario, endereco in login_info:
            print(f"Executando o bot para o usuário: {username}")
            bot = EstasaBot()
            bot.run(username, password)
    else:
        print("Nenhum login encontrado.")