from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class PromenadeHomePage:
    def __init__(self, driver):
        self.driver = driver
        self.url = "https://promenadecond.superlogica.net/clients/areadocondomino/cobranca/index"
        self.boletos_locator = (By.XPATH, "/html/body/div[3]/div[2]/div/div[1]/div[2]/div/div/div/ul/li[4]/a/span")
        self.lista_boletos_em_aberto_locator = (By.XPATH, "/html/body/div[3]/div[2]/div/div[2]/div/div/div[2]/div[2]/div[2]/div/div")
        

    def check_login_success(self):
        try:
            wait = WebDriverWait(self.driver, 20)
            self.driver.get(self.url)
            wait = WebDriverWait(self.driver, 20)
            wait.until(EC.visibility_of_any_elements_located(self.boletos_locator))
            print("Login bem-sucedido e home page carregada.")
            return True
        except Exception as e:
            print(f"Erro ao verificar login: {e}")
            return False

