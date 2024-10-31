import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from bots.src.cipa.login_page import CipaLoginPage
from bots.src.cipa.home_page import CipaHomePage
from bots.src.cipa.download_page import CipaDownloadPage
from bots.common.driver_config import WebDriverConfig
from bots.common.utils import DynamoDBQuery, admin_login_list

class CipaBot:
    def __init__(self):
        current_directory = os.getcwd()
        self.download_dir = os.path.join(current_directory, "downloads")
        self.driver = self.driver = WebDriverConfig.get_firefox_driver(download_dir=self.download_dir, download=False, headless=True)
        self.login_page = CipaLoginPage(self.driver)
        self.home_page = CipaHomePage(self.driver)
        self.download_page = CipaDownloadPage(self.driver)

    def run(self, username, password, condominio):
        try:
            if not self.login_page.login(username, password):
                print(f"Login falhou para o usuário {username}. Pulando para o próximo.")
            
            if self.home_page.check_login_success():
                pesquisar_condominio = self.home_page.pesquisar_condominio(condominio)
                
                if pesquisar_condominio:
                    self.home_page.check_and_click_condominio(condominio)

            if self.download_page.check_download_page:
                listagem_boleto = self.download_page.click_btn_boleto()

        finally:
            #self.driver.quit()
            print(f"Processo finalizado para usuário: {username}")

login_info = [('606',
               'administrativo1@administramosimoveis.com.br',
               'Adm#1234',
               'A4 Offices',
               'aliomar babinsk sartorio',
               'av das americas, 13685, subsolo 107 - barra da tijuca - cep 22631-000')]

if __name__ == "__main__":

    print()
    if login_info:
        for id_imobiliaria, username, password, condominio, proprietario, endereco in login_info:
            print(f"Executando o bot para o usuário: {username}")
            bot = CipaBot()
            bot.run(username, password, condominio)
    else:
        print("Nenhum login encontrado.")