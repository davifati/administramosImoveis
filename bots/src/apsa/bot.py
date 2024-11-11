import sys
import os
import logging
from pathlib import Path

base_dir = Path(__file__).resolve().parents[2]
sys.path.append(str(base_dir))

from datetime import datetime
from src.apsa.login_page import ApsaLoginPage
from src.apsa.home_page import ApsaHomePage
from src.apsa.download_page import ApsaDownloadPage
from common.driver_config import WebDriverConfig
from common.utils import delete_all_files_in_directory, save_rpa_reports, get_latest_pdf, save_boletos
from common.db import MySqlConnector

class ApsaBot:
    def __init__(self):
        current_directory = os.getcwd()
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
            print(reports)
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
            bot = ApsaBot()
            bot.run(username, password, endereco)
    else:
        logging.warning("Nenhum login encontrado.")         

