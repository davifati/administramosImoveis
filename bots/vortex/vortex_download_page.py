from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from common.utils import wait_for_new_file, get_downloaded_files, get_latest_pdf, save_boletos, delete_all_files_in_directory
from common.db import MySqlConnector
import time

class VortexDownloadPage:
    def __init__(self, driver):
        self.driver = driver
        self.segunda_via_boleto_title_locator = (By.ID, "pnPaginaNome")
        self.no_boleto_message_locator = (By.ID, "ContentBody_ucBoletoLista_pListaErro")
        self.lista_boletos_locator = (By.ID, "ContentBody_ucBoletoLista_upListaBoleto")
        self.vencimento_locator = (By.XPATH, ".//span[contains(@id, 'lbListaBoletoVencimento')]")
        self.valor_locator = (By.XPATH, ".//span[contains(@id, 'lbListaBoletoValor')]")
        self.linha_digitavel_locator = (By.XPATH, ".//span[contains(@id, 'lbLinhaDigitavel')]")
        self.btn_download_boleto = (By.XPATH, ".//a[contains(@id, 'lkSeleciona') and @title='Abrir Boleto']")

    def check_boleto(self):
        try:
            wait = WebDriverWait(self.driver, 20)
            no_boleto_message_e = wait.until(EC.visibility_of_element_located(self.no_boleto_message_locator))
            #print("Não existem boletos para segunda via.")
            return False
        except:
            #print("Boleto disponivel.")
            return True
        
    def get_boletos_disponiveis(self):
        try:
            wait = WebDriverWait(self.driver, 20)
            time.sleep(5)
            lista_boletos_e = wait.until(EC.visibility_of_element_located(self.lista_boletos_locator))
            boletos_tabela_e = lista_boletos_e.find_elements(By.XPATH, ".//table[@class='documento']")
            return boletos_tabela_e
        except Exception as e:
            return False
        
    def get_boleto_info(self, download_dir, boletos_tabela, endereco):

        mysql_connector = MySqlConnector()
        delete_all_files_in_directory(download_dir)
        previous_files = get_downloaded_files(download_dir)

        try:

            for boleto in boletos_tabela:
                vencimento_e = boleto.find_element(*self.vencimento_locator)
                data_vencimento = vencimento_e.text.strip()

                valor_e = boleto.find_element(*self.valor_locator)
                vlr_boleto = valor_e.text.strip()

                linha_digitavel_e = boleto.find_element(*self.linha_digitavel_locator)
                linha_digitavel = linha_digitavel_e.text.replace(".", "").replace(" ", "").replace("-", "").strip()

                btn_download_boleto_e = boleto.find_element(*self.btn_download_boleto)
                btn_download_boleto_e.click()

                boleto_info = {
                    "data_vencimento": data_vencimento,
                    "vlr_boleto": vlr_boleto,
                    "linha_digitavel": linha_digitavel,
                    "nome_administradora": "vortex",
                    "endereco_imovel": endereco,
                    "download_concluido": False,
                    "num_pasta": 1
                }

                try:
                    new_file = wait_for_new_file(download_dir, previous_files)
                    boleto_info['download_concluido'] = True
                except TimeoutError:
                    boleto_info['download_conclcuido'] = False
            
                if boleto_info["download_concluido"] == True:
                    pdf_path = get_latest_pdf(download_dir) 
                    link_pdf_boleto = save_boletos(pdf_path, "vortex")

                    if link_pdf_boleto:
                        boleto_info['link_pdf_boleto'] = link_pdf_boleto

                        #print()
                        #print(boleto_info)
                        #print()

                        try:
                            mysql_connector.salvar_boleto(boleto_info)
                        except:
                            return False
            
            return True

        except Exception as e:
            return False

        finally:
            mysql_connector.close_connection()


            