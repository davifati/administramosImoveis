import sys
import os
from pathlib import Path

base_dir = Path(__file__).resolve().parents[2]
sys.path.append(str(base_dir))

from src.bcf.login_page import BcfLoginPage
from src.bcf.home_page import BcfHomePage
from common.driver_config import WebDriverConfig
from common.db import MySqlConnector

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
    query = MySqlConnector()
    items = query.obter_dados("bcf")
    login_info = query.organizar_dados_unidade(items)

    if login_info:
        for item in login_info:
            username = item['login']
            password = item['senha']
            endereco = item['endereco_completo']
            num_pasta = item['num_pasta']

            logging.info(f"Executando o bot para o usuário: {username}")
            bot = BcfBot()
            bot.run(username, password, endereco)
    else:
        logging.warning("Nenhum login encontrado.")         

