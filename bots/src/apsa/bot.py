import sys
import os
import logging
from datetime import datetime

sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from bots.src.apsa.login_page import ApsaLoginPage
from bots.src.apsa.home_page import ApsaHomePage
from bots.src.apsa.download_page import ApsaDownloadPage
from bots.common.driver_config import WebDriverConfig
from bots.common.utils import DynamoDBQuery, admin_login_list, delete_all_files_in_directory, save_rpa_reports
from datetime import datetime

class ApsaBot:
    def __init__(self):
        current_directory = os.getcwd
        self.download_dir = os.path.join(current_directory, "downloads")
        #self.download_dir = r"C:\Users\Jose\Documents\GitHub\administramosImoveis\bots\apsa\downloads"
        self.driver = WebDriverConfig.get_firefox_driver(download_dir=self.download_dir, download=True, headless=True)
        self.login_page = ApsaLoginPage(self.driver)
        self.home_page = ApsaHomePage(self.driver)
        self.download_page = ApsaDownloadPage(self.driver)
        self.mysql_connector = MySqlConnector()

    def run(self, username, password, endereco):
        delete_all_files_in_directory(bot.download_dir)
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
                
                if isinstance(boletos_info, list):
                    for boleto in boletos_info:
                        if boleto.get('download_concluido', False):
                            self.add_report(reports, f"Feito download do boleto para o usuário: {username}", "OK")

                            try:
                                pdf_path = get_latest_pdf(self.download_dir)
                                link_pdf_boleto = save_boletos(pdf_path, "apsa")
                                if link_pdf_boleto:
                                    boleto['link_pdf_boleto'] = link_pdf_boleto
                                    boleto['num_pasta'] = 1
                                    try:
                                        self.mysql_connector.salvar_boleto(boleto)
                                        self.mysql_connector.close_connection()
                                        self.add_report(reports, f"Boleto salvo no MySQL para o usuário: {username}", "OK")
                                    except Exception as e:
                                        self.add_report(reports, f"Erro ao salvar boleto no MySQL para o usuário: {username}: {e}", "FAIL")
                                else:
                                    self.add_report(reports, f"Falha ao enviar o boleto para o S3 para o usuário: {username}", "FAIL")
                            except FileNotFoundError as e:
                                self.add_report(reports, f"Erro ao localizar o boleto PDF na pasta: {e}", "FAIL")
                        
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
            bot.run(username, password, endereco)
    else:
        logging.warning("Nenhum login encontrado.")         

