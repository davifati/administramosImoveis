import sys
import os
from pathlib import Path

base_dir = Path(__file__).resolve().parents[2]
sys.path.append(str(base_dir))

from src.cipa.login_page import CipaLoginPage
from src.cipa.home_page import CipaHomePage
from src.cipa.download_page import CipaDownloadPage
from common.driver_config import WebDriverConfig
from common.db import MySqlConnector

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
    query = MySqlConnector()
    items = query.obter_dados("apsa")
    login_info = query.organizar_dados_unidade(items)

    if login_info:
        for item in login_info:
            username = item['login']
            password = item['senha']
            endereco = item['endereco_completo']
            num_pasta = item['num_pasta']

            logging.info(f"Executando o bot para o usuário: {username}")
            bot = CipaBot()
            bot.run(username, password, endereco)
    else:
        logging.warning("Nenhum login encontrado.")         