import sys
import os
import logging
from datetime import datetime
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from bots.apsa.apsa_login_page import ApsaLoginPage
from bots.apsa.apsa_home_page import ApsaHomePage
from bots.apsa.apsa_download_page import ApsaDownloadPage
from administramosImoveis.src.bots.protel.driver_config import WebDriverConfig
from administramosImoveis.src.bots.protel.utils import DynamoDBQuery, admin_login_list, delete_all_files_in_directory, save_rpa_reports

# Configurando logging para melhor controle de logs
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

class ApsaBot:
    def __init__(self):
        self.download_dir = r"C:\Users\Jose\Documents\GitHub\administramosImoveis\bots\apsa\downloads"
        self.driver = WebDriverConfig.get_firefox_driver(download_dir=self.download_dir, download=True, headless=False)
        self.login_page = ApsaLoginPage(self.driver)
        self.home_page = ApsaHomePage(self.driver)
        self.download_page = ApsaDownloadPage(self.driver)

    def run(self, username, password, endereco):
        reports = []
        try:
            if not self.login_page.login(username, password):
                self.add_report(reports, f"Login falhou para o usuário: {username}", "FAIL")
                return

            if self.home_page.check_pop_up():
                if self.home_page.check_login_success():
                    self.add_report(reports, f"Login bem-sucedido para o usuário: {username}", "OK")
                else:
                    self.add_report(reports, f"Login falhou após pop-up para o usuário: {username}", "FAIL")
                    return

            listagem_boleto = self.download_page.listagem_boleto()
            if listagem_boleto:
                boletos_info = self.download_page.get_info_boleto(endereco)
                
                # Se boletos_info for uma lista de boletos
                if isinstance(boletos_info, list):
                    for boleto in boletos_info:
                        if boleto.get('download_concluido', False):
                            self.add_report(reports, f"Feito download do boleto para o usuário: {username}", "OK")
                        else:
                            self.add_report(reports, f"Falha ao fazer download do boleto para o usuário: {username}", "FAIL")
                else:
                    self.add_report(reports, "Nenhum boleto encontrado ou erro ao obter boletos.", "FAIL")
                    
        except Exception as e:
            logging.error(f"Erro durante a execução para o usuário {username}: {e}")
            self.add_report(reports, f"Erro inesperado para o usuário: {username}", "FAIL")

        finally:
            save_rpa_reports(reports, "apsa")
            self.driver.quit()
            logging.info(f"Processo finalizado para usuário: {username}")

    def add_report(self, reports, msg, status):
        reports.append({
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "msg": msg,
            "status": status
        })

if __name__ == "__main__":
    query = DynamoDBQuery()
    items = query.getAdminLoginDetails(administradora="apsa (login: 32179787 senha 123456)")
    login_info = admin_login_list(items)

    if login_info:
        for id_imobiliaria, username, password, condominio, proprietario, endereco in login_info:
            logging.info(f"Executando o bot para o usuário: {username}")
            bot = ApsaBot()
            delete_all_files_in_directory(bot.download_dir)
            bot.run(username, password, endereco)
    else:
        logging.warning("Nenhum login encontrado.")         

