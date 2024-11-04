from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from bots.common.utils import wait_for_new_file, get_downloaded_files, get_latest_pdf, save_boletos, delete_all_files_in_directory, ajuste_data
from bots.common.db import MySqlConnector
import base64
from PIL import Image
from io import BytesIO
import requests
import re
import os
import time


class BapHomePage:
    def __init__(self, driver):
        self.driver = driver
        self.url = "https://extranet.bap.com.br/#"
        self.menu_locator = (By.XPATH, "/html/body/table[1]/tbody/tr/td[1]/ul")
        self.btn_gerar_boleto_locator = (By.XPATH, "//a[contains(@href, 'boleto') and contains(text(), 'Gerar')]")
        self.bp_lista_corpo = (By.CLASS_NAME, "bp-lista-corpo")
        self.canvas_locator = (By.CSS_SELECTOR, "canvas")

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

    def download_boleto(self, url, download_dir):
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

    def click_btn_gerar_boleto(self, driver):
        btn_gerar_boleto_e = driver.find_element(*self.btn_gerar_boleto_locator)
        btn_gerar_boleto_e.click()

    def download_img_boleto(self):

        canvas_e = self.driver.find_element(*self.canvas_locator)
        canvas_base64 = self.driver.execute_script("""
            var canvas = arguments[0];
            return canvas.toDataURL("image/png").substring(22); // remove o prefixo 'data:image/png;base64,'
        """, canvas_e)      

        image_data = base64.b64decode(canvas_base64)
        image = Image.open(BytesIO(image_data))
        image.save("boleto.png", "PNG")

    def get_boleto_info(self, lista_boletos, download_dir, endereco, idImobiliaria):
        mysql_connector = MySqlConnector()
        delete_all_files_in_directory(download_dir)
        previous_files = get_downloaded_files(download_dir)

        try:
            for boleto in lista_boletos:
                self.click_btn_gerar_boleto(self.driver)

                try:
                    new_file = wait_for_new_file(download_dir, previous_files)
                    download_concluido = True
                except TimeoutError:
                    download_concluido = False

                boleto_info = {
                    "data_vencimento": "Vencimento não encontrado",
                    "vlr_boleto": "Valor do boleto não encontrado",
                    "linha_digitavel": "Linha digitável não encontrada",
                    "nome_administradora": "bap",
                    "download_concluido": download_concluido,
                    "num_pasta": idImobiliaria,
                    "endereco_imovel": endereco
                } 

                if download_concluido:
                    boleto_path = get_latest_pdf(download_dir)

                    time.sleep(5)
                    self.driver.execute_script("Services.prefs.setBoolPref('pdfjs.disabled', false);")

                    self.driver.get(boleto)
                    page_source = self.driver.page_source

                    vencimento_match = re.search(r"VENCIMENTO.*?(\d{2}/\d{2}/\d{4})", page_source)
                    valor_boleto_match = re.search(r"VALOR DOCUMENTO.*?(\d{1,3}(?:\.\d{3})*,\d{2})", page_source)
                    linha_digitavel_match = re.search(r"(\d{5}\.\d{5}\s\d{5}\.\d{6}\s\d{5}\.\d{6}\s\d\s\d{14})", page_source)

                    data_vencimento = vencimento_match.group(1) if vencimento_match else boleto_info["data_vencimento"]
                    data_vencimento = ajuste_data(data_vencimento)

                    vlr_boleto = valor_boleto_match.group(1) if valor_boleto_match else boleto_info["vlr_boleto"]
                    vlr_boleto = float(vlr_boleto.replace('.', '').replace(',', '.'))

                    linha_digitavel = linha_digitavel_match.group(1) if linha_digitavel_match else boleto_info["linha_digitavel"]

                    boleto_info["data_vencimento"] = data_vencimento
                    boleto_info["vlr_boleto"] = vlr_boleto
                    boleto_info["linha_digitavel"] = linha_digitavel

                    link_pdf_boleto = save_boletos(boleto_path, "bap")
                    if link_pdf_boleto:
                        boleto_info["link_pdf_boleto"] = link_pdf_boleto

                    print()
                    print(boleto_info)
                    print()

                    try:
                        mysql_connector.salvar_boleto(boleto_info)
                    except Exception as e:
                        print(f"Erro ao salvar boleto no banco de dados: {e}")
                        return False
                else:
                    print("Download do boleto falhou para o link:", boleto)

            return True

        except Exception as e:
            print(f"Erro durante o processo de boletos: {e}")
            return False

        finally:
            mysql_connector.close_connection()