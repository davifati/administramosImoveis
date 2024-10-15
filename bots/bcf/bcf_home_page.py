from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException


class BcfHomePage:
    def __init__(self, driver):
        self.url = "https://app.bcfadm.com.br/Portal/Home.aspx"
        self.driver = driver
        self.home_link_locator = (By.ID, "ucMenuV_lkHome")

    def check_login_success(self):
        try:
            wait = WebDriverWait(self.driver, 20)
            wait.until(EC.element_to_be_clickable(self.home_link_locator))
            print("Login bem-sucedido e home page carregada.")
            return True
        except Exception as e:
            print(f"Erro ao verificar login: {e}")
            return False
        
    