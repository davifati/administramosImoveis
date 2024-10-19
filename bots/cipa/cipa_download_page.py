from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class CipaDownloadPage:
    def __init__(self, driver):
        self.driver = driver
        self.btn_boleto_locator = (By.XPATH, "/html/body/app-root/ion-content/layout/app-layout/cipafacil-vertical-navigation/div/div[2]/cipafacil-vertical-navigation-group-item[1]/cipafacil-vertical-navigation-basic-item[3]")
        self.condominio_download_page = (By.XPATH, "/html/body/app-root/ion-content/layout/app-layout/div/div/div[1]/div[2]/div/div[1]/span[2]")
        self.boletos_title_locator = (By.XPATH, "/html/body/app-root/ion-content/layout/app-layout/div/div/div[2]/boleto-list/div/div/div[1]/div[1]/div/h2")

    def check_download_page(self):
        try:
            wait = WebDriverWait(self.driver, 20)
            btn_boleto_e = wait.until(EC.presence_of_element_located(self.btn_boleto_locator))
            condominio_download_page_e = wait.until(EC.presence_of_element_located(self.condominio_download_page))
            condominio_download_page_e_text = condominio_download_page_e.text
            print(f"Está na página de download referente ao condominio: {condominio_download_page_e_text}")
            return True
        except Exception as e:
            print(f"Não conseguiu entrar na página de download erro: {e}")

    def click_btn_boleto(self):
        try:
            wait = WebDriverWait(self.driver, 20)
            btn_boleto_e = wait.until(EC.visibility_of_element_located(self.btn_boleto_locator))
            if btn_boleto_e:
                btn_boleto_e.click()
                print(f"Clicou em segunda via boleto.")
                return True
        except Exception as e:
            print(f"Não conseguiu clicar em segunda via boleto. Erro: {e}")
            return False
        
    def check_boletos(self):
        try:
            wait = WebDriverWait(self.driver, 20)
            boletos_title_e = wait.until(EC.visibility_of_element_located(self.boletos_title_locator))
            print("Entrou na listagem de Boletos.")
            return True
        except Exception as e:
            print(f"Não entrou na listagem de Boletos. Erro: {e}")
            return False