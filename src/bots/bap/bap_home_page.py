from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException


class BapHomePage:
    def __init__(self, driver):
        self.driver = driver
        self.url = "https://extranet.bap.com.br/#"
        self.menu_locator = (By.XPATH, "/html/body/table[1]/tbody/tr/td[1]/ul")


    def check_login_success(self):
        try:
            wait = WebDriverWait(self.driver, 20)
            wait.until(EC.presence_of_element_located(self.menu_locator))
            print("Login bem-sucedido e home page carregada.")
            return True
        except Exception as e:
            print(f"Erro ao verificar login: {e}")
            return False