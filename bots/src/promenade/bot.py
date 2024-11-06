import sys
import os
import logging
from datetime import datetime

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..')))

from bots.src.promenade.login_page import PromenadeLoginPage
from bots.common.driver_config import WebDriverConfig
from bots.common.utils import DynamoDBQuery, admin_login_list

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

class PromenadeBot:
    def __init__(self):

        current_directory = os.getcwd()
        
        self.download_dir = os.path.join(current_directory, "downloads"
                                         )
        self.driver = WebDriverConfig.get_firefox_driver(
            download_dir=self.download_dir, download=True, headless=False)

        self.login_page = PromenadeLoginPage(self.driver)

    def run(self, username, password):

        reports = []

        try:

            if not self.login_page.login(username, password):
                self.add_report(reports, f"Login falhou para o usuário: {username}", "FAIL")
                return
            
        except Exception as e:
            logging.error(f"Erro durante a execução para o usuário {username}: {e}")
            self.add_report(reports, f"Erro inesperado para o usuário: {username}", "FAIL")

        finally:
            #save_rpa_reports(reports, "promenade")
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

    query = DynamoDBQuery()
    items = query.getAdminLoginDetails(administradora="promenade")
    login_info = admin_login_list(items)

    print()
    if login_info:
        for id_imobiliaria, username, password, condominio, proprietario, endereco in login_info:
            bot = PromenadeBot()
            bot.run(username, password)