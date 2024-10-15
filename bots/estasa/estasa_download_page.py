from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class EstasaDownloadPage:
    def __init__(self, driver):
        self.driver = driver
        self.url = "https://estasa.icondo.com.br/visualizar-arquivo/?arquivo=segunda-via-boleto"
        self.no_boleto_message_locator = (By.XPATH, "/html/body/div/div[2]/div/div/div/div[2]/div/div/div[1]")
        self.btn_download_locator = ""

    def check_boleto(self):
        try:
            wait = WebDriverWait(self.driver, 20)
            no_boleto_message_e = wait.until(EC.presence_of_element_located(self.no_boleto_message_locator))
            print("Não foi encontrado boleto disponível.")
            return False
        except:
            pass