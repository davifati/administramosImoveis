from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

class ApsaHomePage:
    def __init__(self, driver):
        self.driver = driver
        self.url = "https://areaexclusiva.apsa.com.br/digital/cotas/visualizacaoIndividual"
        self.close_pop_locator = (By.XPATH, "/html/body/app-image-with-link-button/div/div/div[1]/i")
        self.header_logo_locator = (By.XPATH, "/html/body/app-root/ion-app/ion-router-outlet/app-layout/ion-app/div[2]/app-header/header/div[2]")

    def check_pop_up(self):
        try:
            wait = WebDriverWait(self.driver, 10)
            close_pop_e = wait.until(EC.presence_of_element_located(self.close_pop_locator))
            close_pop_e.click()
            print(f"Clicou em fechar Pop_Up.")
            return True
        except Exception as e:
            print(f"Pop_Up não está aberto, continuar.")
            return False

    def check_login_success(self):
        try:
            wait = WebDriverWait(self.driver, 10)
            wait.until(EC.visibility_of_element_located(self.header_logo_locator))
            print("Login bem-sucedido e home page carregada.")
            return True
        except Exception as e:
            print(f"Erro ao verificar login {e}")
            return False

            