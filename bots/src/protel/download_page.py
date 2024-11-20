from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from common.api import move_to_permanent_folder, generate_file_link
from common.utils import get_latest_pdf, ajuste_data, wait_for_new_file, delete_all_files_in_directory, get_downloaded_files
from common.db import MySqlConnector
import os

class ProtelDownloadPage:
    def __init__(self, driver):
        self.driver = driver
        self.url = "https://condominio.protel.com.br/unidades/segunda_via_boleto"
        self.boleto_table_locator = (By.ID, "segunda_via_boletos")
        self.boleto_pdf_locator = (By.XPATH, "//a[contains(@href, '.pdf')]")
        self.boleto_png_locator = (By.XPATH, "//a[contains(@href, '.png')]")
        self.segunda_via_boletos_locator = (By.ID, "segunda_via_boletos")
        self.no_boleto_message_locator = (By.XPATH, "//font[contains(text(), 'Não existem boletos para segunda via.')]")
        self.linha_digitavel_locator = (By.XPATH, "/html/body/div[1]/div[3]/table[2]/tbody/tr[3]/td")
        self.valor_pagar_hoje_locator = (By.XPATH, "/html/body/div[1]/div[3]/table[2]/tbody/tr[2]/td[4]")
        self.vencimento_locator = (By.XPATH, "/html/body/div[1]/div[3]/table[2]/tbody/tr[2]/td[2]")

    def check_boleto(self, endereco, idImobiliaria, download_dir):
        try:
            wait = WebDriverWait(self.driver, 20)

            mysql_connector = MySqlConnector()
            delete_all_files_in_directory(download_dir)
            previous_files = get_downloaded_files(download_dir)

            try:
                no_boleto_message_e = wait.until(EC.presence_of_element_located(self.no_boleto_message_locator))
                if no_boleto_message_e:
                    #print("Não existem boletos para segunda via.")
                    return False

            except:
                boleto_table_e = wait.until(EC.visibility_of_element_located(self.boleto_table_locator))
                #print("Tabela de boletos encontrada, verificando boletos.")

                boleto_pdf_link_e = wait.until(EC.element_to_be_clickable(self.boleto_pdf_locator))

                vencimento = wait.until(EC.visibility_of_element_located(self.vencimento_locator)).text
                vencimento = ajuste_data(vencimento)
                valor = wait.until(EC.visibility_of_element_located(self.valor_pagar_hoje_locator)).text
                valor = float(valor.replace("R$ ", "").replace(".", "").replace(",", "."))
                cod_barras = wait.until(EC.visibility_of_element_located(self.linha_digitavel_locator)).text
                cod_barras = cod_barras.replace("Linha Digitável:", "").replace(".", "").replace(" ", "").replace("-", "").strip()

                boleto_pdf_link_e.click()
                #print(f"Boleto em PDF clicado para download.")

                boleto_info = {
                    "linha_digitavel": cod_barras,
                    "data_vencimento": vencimento,
                    "vlr_boleto": valor,
                    "nome_administradora": "protel",
                    "endereco_imovel": endereco,
                    "download_concluido": False,
                    "num_pasta": idImobiliaria
                }

                try:
                    new_file = wait_for_new_file(download_dir, previous_files)
                    boleto_info["download_concluido"] = True
                except TimeoutError:
                    boleto_info["download_concluido"] = False

                if boleto_info["download_concluido"] == True:
                    boleto_path = get_latest_pdf(download_dir)
                    permanent_path = move_to_permanent_folder(boleto_path)
                    filename = os.path.basename(permanent_path)
                    link_pdf_boleto = generate_file_link(filename)

                    if link_pdf_boleto:
                        boleto_info["link_pdf_boleto"] = link_pdf_boleto 

                print()
                print(boleto_info)
                print()

                try:
                    mysql_connector.salvar_boleto(boleto_info)
                except:
                    return False

                return boleto_info

        except Exception as e:
            print(f"Erro ao tentar verificar ou clicar no boleto PDF: {e}")
            return False

        finally:
            mysql_connector.close_connection