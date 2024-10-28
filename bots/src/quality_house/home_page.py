from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class QualityHouseHomePage:
    def __init__(self, driver):
        self.url = "https://qualityhouse.icondo.com.br/"
        self.driver = driver
        self.segunda_via_locator = (By.XPATH, "/html/body/div/div[1]/div/div/div[2]/div[2]/div/div/ul/li[3]/a")

    def check_login_success(self):
        try:
            wait = WebDriverWait(self.driver, 20)
            wait.until(EC.visibility_of_element_located(self.segunda_via_locator))
            print("Login bem-sucedido e home page carregada.")
            return True
        except Exception as e:
            print(f"Erro ao verificar login: {e}")
            return False
        
    def click_segunda_via_boleto(self):
        try:
            wait = WebDriverWait(self.driver, 20)
            segunda_via_e = wait.until(EC.presence_of_element_located(self.segunda_via_locator))
            segunda_via_e.click()
            print("Botão de segunda via clicado com sucesso.")
        except Exception as e:
            print(f"Erro ao clicar no botão segunda via: {e}")