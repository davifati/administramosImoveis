import sys
import os
import logging
from datetime import datetime
from pathlib import Path

base_dir = Path(__file__).resolve().parents[2]
sys.path.append(str(base_dir))

from src.vortex.login_page import VortexLoginPage
from src.vortex.home_page import VortexHomePage
from src.vortex.download_page import VortexDownloadPage
from common.driver_config import WebDriverConfig
from common.utils import save_rpa_reports
from common.db import MySqlConnector

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

class VortexBot:
    
    def __init__(self):
        current_directory = os.getcwd()
        self.download_dir = os.path.join(current_directory, "downloads")        
        self.driver = WebDriverConfig.get_firefox_driver(download_dir=self.download_dir, download=True, headless=True)
        self.login_page = VortexLoginPage(self.driver)
        self.home_page = VortexHomePage(self.driver)
        self.download_page = VortexDownloadPage(self.driver)

    def run(self, username, password, endereco):

        reports = []
        
        try:
            if not self.login_page.login(username, password, endereco, num_pasta):
                self.add_report(reports, f"Login falhou para o usuário: {username}", "FAIL")
                return
            
            if self.home_page.check_login_success():
                self.add_report(reports, f"Login bem-sucedido para o usuário: {username}", "OK")
                self.home_page.click_segunda_via_boleto()
                boleto_disponivel = self.download_page.check_boleto()
            else:
                self.add_report(reports, f"Erro ao tentar checar hom page para usuário: {username}", "FAIL")
                return

            if boleto_disponivel:
                boletos_disponiveis = self.download_page.get_boletos_disponiveis()
            else:
                self.add_report(reports, f"Nenhum boleto disponível para o usuário: {username}", "OK")

            if boletos_disponiveis:
                boleto_info = self.download_page.get_boleto_info(self.download_dir, boletos_disponiveis, endereco, num_pasta)
                self.add_report(reports, f"Feito download do boleto para o usuário: {username}", "OK")
        
        except Exception as e:
            logging.error(f"Erro durante a execução para o usuário {username}: {e}")
            self.add_report(reports, f"Erro inesperado para o usuário: {username}", "FAIL")
            
        finally:
            save_rpa_reports(reports, "vortex")
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
    items = query.obter_dados("vortex")
    login_info = query.organizar_dados_unidade(items)

    if login_info:
        for item in login_info:
            username = item['login']
            password = item['senha']
            endereco = item['endereco_completo']
            num_pasta = item['num_pasta']

            logging.info(f"Executando o bot para o usuário: {username}")
            bot = VortexBot()
            bot.run(username, password, endereco, num_pasta)
    else:
        logging.warning("Nenhum login encontrado.")         
