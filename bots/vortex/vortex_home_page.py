from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

class VortexHomePage:
    def __init__(self, driver):
        self.url = "https://vortex.livefacilities.com.br/Portal/home.aspx"
        self.driver = driver
        self.btn_financeiro_locator = (By.XPATH, "/html/body/form/div[3]/aside/div/div[4]/div[1]/a")
        self.btn_segunda_via_locator = (By.XPATH, "/html/body/form/div[3]/aside/div/div[4]/div[1]/div[1]/a")

    def check_login_success(self):
        try:
            wait = WebDriverWait(self.driver, 20)
            wait.until(EC.presence_of_element_located(self.btn_financeiro_locator))
            print("Login bem-sucedido e home page carregada.")
            return True
        except Exception as e:
            print(f"Erro ao verificar login: {e}")
            return False
    
    def click_segunda_via_boleto(self):
        try:
            wait = WebDriverWait(self.driver, 20)
            
            btn_financeiro_e = wait.until(EC.presence_of_element_located(self.btn_financeiro_locator))
            btn_financeiro_e.click()
            time.sleep(2)

            btn_segunda_via_e = wait.until(EC.visibility_of_element_located(self.btn_segunda_via_locator))
            btn_segunda_via_e.click()
            time.sleep(2)

            print(f"Botão de segunda via clicado com sucesso.")
        except Exception as e:
            print(f"Erro ao clicar no botão segunda via: {e}")