import sys
import os
import logging
from datetime import datetime
from pathlib import Path

base_dir = Path(__file__).resolve().parents[2]
sys.path.append(str(base_dir))

from src.protest.login_page import ProtestLoginPage
from src.protest.home_page import ProtestHomePage
from src.protest.download_page import ProtestDownloadPage
from common.driver_config import WebDriverConfig
from common.utils import save_rpa_reports
from common.db import MySqlConnector

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

class ProtestBot():
    def __init__(self):
        current_directory = os.getcwd()
        self.download_dir = os.path.join(current_directory, "downloads")
        self.driver = WebDriverConfig.get_firefox_driver(download_dir=self.download_dir, download=True, headless=True)
        self.login_page = ProtestLoginPage(self.driver)
        self.home_page = ProtestHomePage(self.driver)
        self.download_page = ProtestDownloadPage(self.driver)

    def run(self, username, password, endereco, num_pasta):

        reports = []

        try:
            if not self.login_page.login(username, password):
                self.add_report(reports, f"Login falhou para o usuário: {username}", "FAIL")
                return

            if self.home_page.check_login_success():
                self.add_report(reports, f"Login bem-sucedido para o usuário: {username}", "OK")
                self.home_page.click_segunda_via_boleto()
            else:
                self.add_report(reports, f"Erro ao tentar checar home page para o usuário: {username}", "FAIL")

            boleto_disponivel = self.download_page.check_boleto()

            if boleto_disponivel:
                download_boleto = self.download_page.get_boleto_info(self.download_dir, endereco, id_imobiliaria)
                self.add_report(reports, f"Feito download do boleto para o usuário: {username}", "OK")
            else:
                self.add_report(reports, f"Nenhum boleto disponível para o usuário: {username}", "OK")
        
        except Exception as e:
            logging.error(f"Erro durante a execução para o usuário {username}: {e}")
            self.add_report(reports, f"Erro inesperado para o usuário: {username}", "FAIL")

        finally:
            save_rpa_reports(reports, "protest")
            print(reports)
            self.driver.quit()
            logging.info(f"Processo finalizado para o usuário: {username}")

        
    def add_report(self, reports, msg, status):
        reports.append({
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "msg": msg,
            "status": status
        })     

if __name__ == "__main__":
    query = MySqlConnector()
    items = query.obter_dados("protest")
    login_info = query.organizar_dados_unidade(items)

    if login_info:
        for item in login_info:
            username = item['login']
            password = item['senha']
            endereco = item['endereco_completo']
            num_pasta = item['num_pasta']

            logging.info(f"Executando o bot para o usuário: {username}")
            bot = ProtestBot()
            bot.run(username, password, endereco, num_pasta, )
    else:
        logging.warning("Nenhum login encontrado.")         
