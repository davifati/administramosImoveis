import sys
import os
import logging
from datetime import datetime
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from bots.vortex.vortex_login_page import VortexLoginPage
from bots.vortex.vortex_home_page import VortexHomePage
from bots.vortex.vortex_download_page import VortexDownloadPage
from common.driver_config import WebDriverConfig
from common.utils import DynamoDBQuery, admin_login_list, save_rpa_reports


logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

class VortexBot:
    def __init__(self):
        self.download_dir = r"C:\Users\Jose\Documents\GitHub\administramosImoveis\bots\vortex\downloads"
        self.driver = WebDriverConfig.get_firefox_driver(download_dir=self.download_dir, download=True, headless=True)
        self.login_page = VortexLoginPage(self.driver)
        self.home_page = VortexHomePage(self.driver)
        self.download_page = VortexDownloadPage(self.driver)

    def run(self, username, password, endereco):

        reports = []
        
        try:
            if not self.login_page.login(username, password):
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
                boleto_info = self.download_page.get_boleto_info(self.download_dir, boletos_disponiveis, endereco)
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

    query = DynamoDBQuery()
    items = query.getAdminLoginDetails(administradora="vortex")
    login_info = admin_login_list(items)

    '''login_info = [{
    'endereco_condominio': {
        'S': 'estrada coronel pedro correa, 140, apto 1109 bloco 01 - jacarepagua - cep 22775-090'
    },
    'idImobiliaria': {
        'S': '708'
    },
    'condominio': {
        'S': 'like residencial club'
    },
    'id': {
        'N': '444'
    },
    'administradora': {
        'S': 'vortex'
    },
    'login_usuario': {
        'S': 'andre.alexandre'
    },
    'login_senha': {
        'S': 'Adm12345'
    },
    'proprietario': {
        'S': 'andre alexandre fernandes souto'
    },
    'cpf_proprietario': {
        'S': '082050377-01'
    },
    'site_administradora': {
        'S': 'www.vortexadm.com.br'
    },
    'vencimento_aluguel': {
        'N': '5'
    }
    }]'''

    #login_info = admin_login_list(login_info)

    if login_info:
        for id_imobiliaria, username, password, condominio, proprietario, endereco in login_info:
            #print(f"Executando o bot para o usuário: {username}")
            print()
            bot = VortexBot()
            bot.run(username, password, endereco)
    else:
        print("Nenhum login encontrato.")