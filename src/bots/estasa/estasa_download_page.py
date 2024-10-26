from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from common.utils import wait_for_new_file, get_downloaded_files, get_latest_pdf, save_boletos, delete_all_files_in_directory
from common.db import MySqlConnector
import requests
import os
import time

class EstasaDownloadPage:
    def __init__(self, driver):
        self.driver = driver
        self.url = "https://estasa.icondo.com.br/visualizar-arquivo/?arquivo=segunda-via-boleto"
        self.no_boleto_message_locator = (By.XPATH, "/html/body/div/div[2]/div/div/div/div[2]/div/div/div[1]")
        self.btn_download_locator = (By.ID, "export-bar")
        self.btn_open_boleto_in_new_tab_locator = (By.XPATH, "//a[contains(@class, 'export-new-window')]")

    def check_boleto(self):
        try:
            wait = WebDriverWait(self.driver, 10)
            btn_download_e = wait.until(EC.visibility_of_element_located(self.btn_download_locator))
            return True
        except:
            no_boleto_message_e = wait.until(EC.visibility_of_element_located(self.no_boleto_message_locator))
            print("Não foi encontrado boleto disponível.")
            return False

    def download_pdf_from_link(self, download_dir):

        try:
            link_pdf_element = self.driver.find_element(By.CLASS_NAME, "export-new-window")
            pdf_url = link_pdf_element.get_attribute('href')

            if pdf_url:
                print(f"Link do PDF encontrado: {pdf_url}")
                response = requests.get(pdf_url)
                if response.status_code == 200:
                    pdf_filename = os.path.join(download_dir, "arquivo_boleto.pdf")
                    with open(pdf_filename, 'wb') as f:
                        f.write(response.content)
                    print(f"PDF baixado com sucesso em {pdf_filename}.")
                else:
                    print("Erro ao baixar o PDF. Código de status:", response.status_code)
            else:
                print("Link do PDF não encontrado.")
        except Exception as e:
            print(f"Erro ao tentar baixar o PDF: {e}")
            
    def get_boleto_info(self, download_dir, endereco):

        mysql_connector = MySqlConnector()
        delete_all_files_in_directory(download_dir)
        previous_files = get_downloaded_files(download_dir)

        try:

            wait = WebDriverWait(self.driver, 20)

            download_boleto = self.download_pdf_from_link(download_dir)

            btn_open_boleto_in_new_tab_e = wait.until(EC.element_to_be_clickable(self.btn_open_boleto_in_new_tab_locator))
            if btn_open_boleto_in_new_tab_e:
                btn_open_boleto_in_new_tab_e.click()

            wait.until(EC.new_window_is_opened)
            tabs = self.driver.window_handles
            self.driver.switch_to.window(tabs[-1])
        except Exception as e:
            print(e)
            pass