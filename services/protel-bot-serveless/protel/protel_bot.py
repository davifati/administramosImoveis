import sys
import os
from protel_login_page import ProtelLoginPage
from protel_home_page import ProtelHomePage
from protel_download_page import ProtelDownloadPage
from common.driver_config import WebDriverConfig
from common.utils import DynamoDBQuery, admin_login_list, delete_all_files_in_directory, save_rpa_reports, save_boletos, get_latest_pdf
from common.db import MySqlConnector

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")


class ProtelBot:

    def __init__(self):
        self.download_dir = "/Users/davidlima/Documents/WSPACE/administramosImoveis/protel-bot/protel/trash"
        self.driver = WebDriverConfig.get_firefox_driver(
            download_dir=self.download_dir, download=True, headless=True
        )
        self.login_page = ProtelLoginPage(self.driver)
        self.home_page = ProtelHomePage(self.driver)
        self.download_page = ProtelDownloadPage(self.driver)
        self.mysql_connector = MySqlConnector()

    def run(self, username, password, endereco):
        delete_all_files_in_directory(self.download_dir)
        reports = []
        
        try:

            if not self.login_page.login(username, password):
                print(
                    f"Login falhou para o usuário {username}. Pulando para o próximo."
                )
                return

            if self.home_page.check_login_success():
                self.add_report(reports, f"Login bem-sucedido para o usuário {username}", "OK")

                self.home_page.click_boleto()

                boleto_disponivel = self.download_page.check_boleto(endereco)

                if boleto_disponivel:
                    self.add_report(reports, f"Feito download do boleto para o usuário {username}", "OK")

                    try:
                        pdf_path = get_latest_pdf(self.download_dir)
                        link_pdf_boleto = save_boletos(pdf_path, "protel")
                        if link_pdf_boleto:
                            boleto_disponivel['link_pdf_boleto'] = link_pdf_boleto
                            boleto_disponivel['num_pasta'] = 1
                            try:
                                self.mysql_connector.salvar_boleto(boleto_disponivel)
                                self.mysql_connector.close_connection()
                                self.add_report(reports, f"Boleto salvo no banco de dados para o usuário {username}", "OK")
                            except Exception as e:
                                self.add_report(reports, f"Falha ao localizar o boleto baixado para o usuário {username}", "FAIL")
                    except FileNotFoundError as e:
                        self.add_report(reports, f"Erro ao localizar o boleto PDF na pasta: {e}", "FAIL")
                else:
                    self.add_report(reports, f"Falha ao fazer download do boleto para o usuário: {username}", "FAIL")
            else:
                self.add_report(reports, "Nenhum boleto encontrado ou erro ao obter boletos.", "FAIL")

        except Exception as e:
            logging.error(f"Erro durante a execução para o usuário {username}: {e}")
            self.add_report(reports, f"Erro inesperado para o usuário {username}", "FAIL")

        finally:
            save_rpa_reports(reports, "protel")
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
    items = query.getAdminLoginDetails(administradora="protel")
    login_info = admin_login_list(items)

    print()
    if login_info:
        for (
            id_imobiliaria,
            username,
            password,
            condominio,
            proprietario,
            endereco,
        ) in login_info:
            print(f"Executando o bot para o usuário: {username}")
            bot = ProtelBot()
            bot.run(username, password, endereco)
    else:
        print("Nenhum login encontrado.")
