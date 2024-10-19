from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class VortexDownloadPage:
    def __init__(self, driver):
        self.driver = driver
        self.segunda_via_boleto_title_locator = (By.ID, "pnPaginaNome")
        self.no_boleto_message_locator = (By.ID, "ContentBody_ucBoletoLista_pListaErro")

    def check_boleto(self):
        try:
            wait = WebDriverWait(self.driver, 20)
            no_boleto_message_e = wait.until(EC.visibility_of_element_located(self.no_boleto_message_locator))
            print("Não existem boletos para segunda via.")
            return False
        except:
            print("Boleto disponivel.")
            return True