from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from common.utils import wait_for_new_file, get_downloaded_files, get_latest_pdf, save_boletos, delete_all_files_in_directory, ajuste_data
from common.db import MySqlConnector
import requests
import os
import time
import base64
import pyperclip


class EstasaDownloadPage:
    def __init__(self, driver):
        self.driver = driver
        self.url = "https://estasa.icondo.com.br/visualizar-arquivo/?arquivo=segunda-via-boleto"
        self.no_boleto_message_locator = (By.XPATH, "/html/body/div/div[2]/div/div/div/div[2]/div/div/div[1]")
        self.btn_download_locator = (By.ID, "export-bar")
        self.btn_open_boleto_in_new_tab_locator = (By.XPATH, "//a[contains(@class, 'export-new-window')]")
        self.btn_boleto_page_locator = (By.CLASS_NAME, "export-new-window")
        self.boleto_image_locator = (By.ID, "boleto")
        self.data_vencimento_locator = (By.XPATH, "/html/body/div/div/div[3]/div/table/tbody/tr/td[2]")
        self.vlr_boleto_locator = (By.XPATH, "//td[contains(text(), 'Total')]/following-sibling::td[@class='txt-right']")
        self.btn_copiar_linha_digitavel_locator = (By.ID, "copiar")
        self.linha_digitavel = (By.ID, "linha-digitavel")
        self.boleto_img_locator = (By.ID, "boleto")

    def check_boleto(self):
        wait = WebDriverWait(self.driver, 10)
        try:
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
            
    def download_boleto_img(self, download_dir, url_boleto):
        boleto_path = os.path.join(download_dir, "boleto.png")

        response = requests.get(url_boleto)
        if response.status_code == 200:
            with open(boleto_path, 'wb') as f:
                for chunk in response.iter_content(1024):
                    f.write(chunk)
                
            return True
        
    def copiar_linha_digitavel(self):
        try:
            wait = WebDriverWait(self.driver, 20)
            btn_copiar_linha_digitavel_e = self.driver.find_element(*self.btn_copiar_linha_digitavel_locator)
            btn_copiar_linha_digitavel_e.click()
            time.sleep(1)
            linha_digitavel = pyperclip.paste()
            return linha_digitavel
        except Exception as e:
            #print(f"Erro ao copiar a linha digitável, erro: {e}")
            return e

    def get_boleto_info(self, download_dir, endereco, idImobiliaria):

        mysql_connector = MySqlConnector()
        delete_all_files_in_directory(download_dir)
        previous_files = get_downloaded_files(download_dir)

        try:

            wait = WebDriverWait(self.driver, 20)

            btn_boleto_page_e = wait.until(EC.visibility_of_element_located(self.btn_boleto_page_locator))
            url_boleto_page = btn_boleto_page_e.get_attribute("href")

            self.driver.get(url_boleto_page)
            visible_boleto = wait.until(EC.visibility_of_element_located(self.boleto_image_locator))
            if visible_boleto:
                
                data_vencimento_e = self.driver.find_element(*self.data_vencimento_locator)
                data_vencimento = data_vencimento_e.text
                data_vencimento = ajuste_data(data_vencimento)

                vlr_boleto_e = self.driver.find_element(*self.vlr_boleto_locator)
                vlr_boleto = vlr_boleto_e.text
                vlr_boleto = float(vlr_boleto.replace('.', '').replace(',', '.'))

                boleto_img_e = self.driver.find_element(*self.boleto_image_locator)
                boleto_img_src = boleto_img_e.get_attribute("src")
                
                linha_digitavel = self.driver.execute_script("return document.getElementById('linha-digitavel').textContent;")
                linha_digitavel = base64.b64decode(linha_digitavel).decode('utf-8')
                
                #print(linha_digitavel)
                
                boleto_download = self.download_boleto_img(download_dir, boleto_img_src)

                boleto_info = {
                    "data_vencimento": data_vencimento,
                    "vlr_boleto": vlr_boleto,
                    "linha_digitavel": linha_digitavel,
                    "nome_administradora": "estasa",
                    "download_concluido": False,
                    "num_pasta": idImobiliaria,
                    "endereco_imovel": endereco
                }

                try:
                    new_file = wait_for_new_file(download_dir, previous_files)
                    boleto_info["download_concluido"] = True
                except TimeoutError:
                    boleto_info['download_concluido'] = False

                if boleto_info["download_concluido"] == True:
                    boleto_path = get_latest_pdf(download_dir)
                    link_pdf_boleto = save_boletos(boleto_path, "estasa")

                    if link_pdf_boleto:
                        boleto_info["link_pdf_boleto"] = link_pdf_boleto

                        print()
                        print(boleto_info)
                        print()

                        try:
                            mysql_connector.salvar_boleto(boleto_info)
                        except:
                            return False

            return True            

        except Exception as e:
            print(e)
            return False
    
        finally:
            mysql_connector.close_connection