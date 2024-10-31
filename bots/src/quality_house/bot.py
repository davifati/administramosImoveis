import sys
import os
import logging
from datetime import datetime

sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from bots.src.quality_house.login_page import QualityHouseLoginPage
from bots.src.quality_house.home_page import QualityHouseHomePage
from bots.src.quality_house.download_page import QualityHouseDownloadPage
from bots.common.driver_config import WebDriverConfig
from bots.common.utils import DynamoDBQuery, admin_login_list, save_rpa_reports

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

class QualityHouseBot():
    def __init__(self):
        current_directory = os.getcwd()
        self.download_dir = os.path.join(current_directory, "downloads")        
        self.driver = WebDriverConfig.get_firefox_driver(download_dir=self.download_dir, download=True, headless=True)
        self.login_page = QualityHouseLoginPage(self.driver)
        self.home_page = QualityHouseHomePage(self.driver)
        self.download_page = QualityHouseDownloadPage(self.driver)

    def run(self, username, password):

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
                download_boleto = self.download_page.get_boleto_info(self.download_dir, endereco)
                self.add_report(reports, f"Feito download do boleto para o usuário: {username}", "OK")
            else:
                self.add_report(reports, f"Nenhum boleto disponível para o usuário: {username}", "OK")

        except Exception as e:
            logging.error(f"Erro durante a execução para o usuário {username}: {e}")
            self.add_report(reports, f"Erro inesperado para o usuário: {username}", "FAIL")

        finally:
            save_rpa_reports(reports, "quality house")
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
    items = query.getAdminLoginDetails(administradora="quality house")
    login_info = admin_login_list(items)

    print()
    if login_info:
        for id_imobiliaria, username, password, condominio, proprietario, endereco in login_info:
            #print(f"Executando o bot para o usuário: {username}")
            bot = QualityHouseBot()
            bot.run(username, password)