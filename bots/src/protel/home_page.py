from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class ProtelHomePage:
    def __init__(self, driver):
        self.url = "https://condominio.protel.com.br/unidades"
        self.driver = driver
        self.protel_logo_locator = (By.ID, "logo_protel")
        self.btn_segunda_via_locator = (By.ID, "segunda_via")

    def check_login_success(self):
        try:
            WebDriverWait(self.driver, 20).until(
                EC.visibility_of_element_located(self.btn_segunda_via_locator)
            )
            #print("Login bem-sucedido e home page carregada.")
            return True
        except Exception as e:
            #print(f"Erro ao verificar login: {e}")
            return False
        
    def click_boleto(self):
        try:
            wait = WebDriverWait(self.driver, 20)
            btn_segunda_via_e = wait.until(EC.element_to_be_clickable(self.btn_segunda_via_locator))
            btn_segunda_via_e.click()
            #print("Botão de segunda via clicado com sucesso.")
            return True
        except Exception as e:
            #print(f"Erro ao clicar no botão segunda via: {e}")
            return False