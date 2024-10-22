from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

class CipaHomePage:
    def __init__(self, driver):
        self.driver = driver
        self.input_pesquisar_condominio_locator = (By.XPATH, '//*[@id="mat-input-2"]')
        self.btn_pesquisar_locator = (By.XPATH, "/html/body/app-root/ion-content/layout/app-layout/div/div/div[2]/condominium-list/div/div/div[2]/div/button")
        self.condominio_selecionado_locator = (By.XPATH, "/html/body/app-root/ion-content/layout/app-layout/div/div/div[2]/condominium-list/div/div/div[3]/div/div")
        self.condominio_selecionado_nome_locator = (By.XPATH, "/html/body/app-root/ion-content/layout/app-layout/div/div/div[2]/condominium-list/div/div/div[3]/div/div/div/div/div")
        

    def check_login_success(self):
        try:
            wait = WebDriverWait(self.driver, 20)
            wait.until(EC.presence_of_element_located(self.input_pesquisar_condominio_locator))
            print("Login bem-sucedido e home page carregada.")
            return True
        except Exception as e:
            print(f"Erro ao verificar login: {e}")
            return False
        
    def pesquisar_condominio(self, condominio):
        try:
            wait = WebDriverWait(self.driver, 20)
            input_pesquisar_condominio_e = wait.until(EC.presence_of_element_located(self.input_pesquisar_condominio_locator))
            btn_pesquisar_e = wait.until(EC.presence_of_element_located(self.btn_pesquisar_locator))

            input_pesquisar_condominio_e.send_keys(condominio)
            time.sleep(2)

            btn_pesquisar_e.click()
            time.sleep(2)
            print(f"Pesquisou o condominio: {condominio}")
            return True
        except Exception as e:
            print(f"Não conseguiu pesquisar o condominio, erro: {e}")
            return False
        
    def check_and_click_condominio(self, condominio):
        try:
            wait = WebDriverWait(self.driver, 20)
            condominio_selecionado_e = wait.until(EC.presence_of_element_located(self.condominio_selecionado_locator))
            condominio_selecionado_nome_e_text = wait.until(EC.presence_of_element_located(self.condominio_selecionado_nome_locator)).text
            condominio_selecionado_nome_e_text = condominio_selecionado_nome_e_text.split("-", 1)[-1].strip()

            if condominio == condominio_selecionado_nome_e_text:
                condominio_selecionado_e.click()
            else:
                print("Nome de condominio diferente do que está no site CIPA, favor verificar.")
            
            print(f"Selecionou condominio: {condominio}")
            return True
        except Exception as e:
            print(f"Não conseguiu selecionar o condominio: {condominio}")
            return False

