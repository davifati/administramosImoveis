from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from common.utils import wait_for_new_file, get_downloaded_files, get_latest_pdf, save_boletos, delete_all_files_in_directory
from common.db import MySqlConnector
import requests
import re
import os


class BapHomePage:
    def __init__(self, driver):
        self.driver = driver
        self.url = "https://extranet.bap.com.br/#"
        self.menu_locator = (By.XPATH, "/html/body/table[1]/tbody/tr/td[1]/ul")
        self.btn_gerar_boleto_locator = By.XPATH, ("//a[contains(@href, 'boleto') and contains(text(), 'Gerar')]")


    def check_login_success(self):
        try:
            wait = WebDriverWait(self.driver, 20)
            wait.until(EC.presence_of_element_located(self.menu_locator))
            print("Login bem-sucedido e home page carregada.")
            return True
        except Exception as e:
            print(f"Erro ao verificar login: {e}")
            return False

    def check_boletos(self):
        wait = WebDriverWait(self.driver, 10)
        
        try:
            boletos = wait.until(EC.presence_of_all_elements_located(self.btn_gerar_boleto_locator))
            
            if boletos:
                lista_boletos = []
                for boleto in boletos:
                    link_boleto = boleto.get_attribute("href")
                    lista_boletos.append(link_boleto)
                return lista_boletos
            else:
                print("Nenhum boleto encontrado")
                return False
            
        except Exception as e:
            print(f"Erro ao localizar os boletos: {e}")


    def download_boleto(url, download_dir):
        if not os.path.exists(download_dir):
            os.makedirs(download_dir)

        file_name = url.split("recibo_codigo=")[-1] + ".pdf"
        file_path = os.path.join(download_dir, file_name)

        try:
            response = requests.get(url, stream=True)
            response.raise_for_status()

            with open(file_path, "wb") as file:
                for chunk in response.iter_content(chunk_size=8192):
                    file.write(chunk)

            print(f"Boleto baixado e salvo em: {file_path}")
            return file_path
    
        except requests.exceptions.RequestException as e:
            print(f"Erro ao baixar o boleto: {e}")
            return None


    def get_boleto_info(self, lista_boletos, download_dir, endereco):

        mysql_connector = MySqlConnector()
        delete_all_files_in_directory(download_dir)
        previous_files = get_downloaded_files(download_dir)

        for boleto in lista_boletos:

            self.driver.get(boleto)
            page_source = self.driver.page_source

            vencimento_match = re.search(r"VENCIMENTO.*?(\d{2}/\d{2}/\d{4})", page_source)
            valor_boleto_match = re.search(r"VALOR DOCUMENTO.*?(\d{1,3}(?:\.\d{3})*,\d{2})", page_source)
            linha_digitavel_match = re.search(r"(\d{5}\.\d{5}\s\d{5}\.\d{6}\s\d{5}\.\d{6}\s\d\s\d{14})", page_source)

            vencimento = vencimento_match.group(1) if vencimento_match else "Vencimento não encontrado"
            valor_boleto = valor_boleto_match.group(1) if valor_boleto_match else "Valor do boleto não encontrado"
            linha_digitavel = linha_digitavel_match.group(1) if linha_digitavel_match else "Linha digitável não encontrada"            

            boleto_info = {
                "data_vencimento": vencimento,
                "vlr_boleto": valor_boleto,
                "linha_digitavel": linha_digitavel,
                "nome_administradora": "bap",
                "download_concluido": False,
                "num_pasta": 1,
                "endereco_imovel": endereco
            }

            download_boleto = download_boleto(boleto, download_dir)

            try:
                new_file = wait_for_new_file(download_dir, previous_files)
                boleto_info["download_concluido"] = True
            except TimeoutError:
                boleto_info["download_concluido"] = False

            if boleto_info["download_concluido"] == True:
                boleto_path = get_latest_pdf(download_dir)
                lin