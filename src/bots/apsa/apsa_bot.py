import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from bots.apsa.apsa_login_page import ApsaLoginPage
from bots.apsa.apsa_home_page import ApsaHomePage
from bots.apsa.apsa_download_page import ApsaDownloadPage
from administramosImoveis.src.bots.protel.driver_config import WebDriverConfig
from administramosImoveis.src.bots.protel.utils import DynamoDBQuery, admin_login_list, delete_all_files_in_directory, save_rpa_reports
from datetime import datetime

class ApsaBot:
    def __init__(self):
        self.download_dir = r"C:\Users\Jose\Documents\GitHub\administramosImoveis\bots\apsa\downloads"
        self.driver = WebDriverConfig.get_firefox_driver(download_dir=self.download_dir, download=True, headless=False)
        self.login_page = ApsaLoginPage(self.driver)
        self.home_page = ApsaHomePage(self.driver)
        self.download_page = ApsaDownloadPage(self.driver)

    def run(self, username, password, endereco):
        try:
            reports = []
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            listagem_boleto = False
            if not self.login_page.login(username, password):
                message = f"Login falhou para o usuário: {username}. Pulando para o próximo."
                reports.append({
                    "timestamp": timestamp,
                    "msg": message,
                    "status": "nOK"
                })
                return

            if self.home_page.check_pop_up():
                self.home_page.check_login_success()
                    
            listagem_boleto = self.download_page.listagem_boleto()
            if listagem_boleto:
                boletos_info = self.download_page.get_info_boleto(endereco)
                if boletos_info['download_concluido'] == True:
                    message = f"Feito download do boleto para o usuário: {username}."
                    reports.append({
                        "timestamp": timestamp,
                        "msg": message,
                        "status": 'OK'
                    })
                else:
                    message = f"Feito login, porém não conseguiu fazer download do boleto para o usuário: {username}."
                    reports.append({
                        "timestamp": timestamp,
                        "msg": message,
                        "status": "nOK"
                    })

        finally:
            self.driver.quit()
            print(f"Processo finalizado para usuário: {username}\n")

if __name__ == "__main__":

    query = DynamoDBQuery()
    items = query.getAdminLoginDetails(administradora="apsa (login: 32179787 senha 123456)")
    login_info = admin_login_list(items)

    print()
    if login_info:
        for id_imobiliaria, username, password, condominio, proprietario, endereco in login_info:
            print(f"Executando o bot para o usuário: {username}")
            bot = ApsaBot()
            delete_all_files_in_directory(bot.download_dir)
            bot.run(username, password, endereco)
    else:
        print("Nenhum login encontrado.")