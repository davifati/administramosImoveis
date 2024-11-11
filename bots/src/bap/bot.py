import sys
import os
import logging
from pathlib import Path

base_dir = Path(__file__).resolve().parents[2]
sys.path.append(str(base_dir))

from src.bap.login_page import BapLoginPage
from src.bap.home_page import BapHomePage
from common.driver_config import WebDriverConfig
from common.db import MySqlConnector
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
                                                   idImobiliaria=num_pasta)
                    
        except:
            self.driver.quit()
            print(f"Processo finalizado para usuário: {username}\n")

if __name__ == "__main__":
    query = MySqlConnector()
    items = query.obter_dados("bap")
    login_info = query.organizar_dados_unidade(items)

    if login_info:
        for item in login_info:
            username = item['login']
            password = item['senha']
            endereco = item['endereco_completo']
            num_pasta = item['num_pasta']

            logging.info(f"Executando o bot para o usuário: {username}")
            bot = BapBot()
            bot.run(username, password, endereco)
    else:
        logging.warning("Nenhum login encontrado.")         

