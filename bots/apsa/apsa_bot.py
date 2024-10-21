import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from bots.apsa.apsa_login_page import ApsaLoginPage
from bots.apsa.apsa_home_page import ApsaHomePage
from bots.apsa.apsa_download_page import ApsaDownloadPage
from common.driver_config import WebDriverConfig
from common.utils import DynamoDBQuery, admin_login_list, delete_all_files_in_directory

class ApsaBot:
    def __init__(self):
        self.download_dir = r"C:\Users\Jose\Documents\GitHub\administramosImoveis\bots\apsa\downloads"
        self.driver = WebDriverConfig.get_firefox_driver(download_dir=self.download_dir, download=True, headless=False)
        self.login_page = ApsaLoginPage(self.driver)
        self.home_page = ApsaHomePage(self.driver)
        self.download_page = ApsaDownloadPage(self.driver)

    def run(self, username, password):
        try:

            listagem_boleto = False
            if not self.login_page.login(username, password):
                print(f"Login falhou para o usuário {username}. Pulando para o próximo.")
                return

            if self.home_page.check_pop_up():
                self.home_page.check_login_success()
                    
            listagem_boleto = self.download_page.listagem_boleto()
            if listagem_boleto:
                boletos_info = self.download_page.get_info_boleto()
                if boletos_info:
                    print(boletos_info) 
                else:
                    print("Nenhum boleto com situação: Em aberto")

        finally:
            #self.driver.quit()
            print(f"Processo finalizado para usuário: {username}\n")

if __name__ == "__main__":

    #query = DynamoDBQuery()
    #items = query.getAdminLoginDetails(administradora="apsa (login: 32179787 senha 123456)")
    #login_info = admin_login_list(items)

    login_info = [{'endereco_condominio': {'S': 'rua jacarandas da peninsula, 880, apto 103 bloco 01 - barra da tijuca - cep 22776-050'},   
    'idImobiliaria': {'S': '179'},
    'condominio': {'S': 'aquarela peninsula'},
    'id': {'N': '62'},
    'administradora': {'S': 'apsa (login: 32179787 senha 123456)'},
    'login_usuario': {'S': 'helioparente'},
    'login_senha': {'S': '230863'},
    'proprietario': {'S': 'helio parente de vasconcelos filho'},
    'cpf_proprietario': {'S': '23599081387'},
    'site_administradora': {'S': 'https://areaexclusiva.apsa.com.br/digital/login'},
    'vencimento_aluguel': {'N': '10'}}]

    login_info = admin_login_list(login_info)

    print()
    if login_info:
        for id_imobiliaria, username, password, condominio, proprietario, endereco in login_info:
            print(f"Executando o bot para o usuário: {username}")
            bot = ApsaBot()
            delete_all_files_in_directory(bot.download_dir)
            bot.run(username, password)
    else:
        print("Nenhum login encontrado.")