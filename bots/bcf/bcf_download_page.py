from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class BcfDownloadPage:
    def __init__(self, driver):
        self.driver = driver
        self.url = ""
        self.segunda_via_title_locator = (By.XPATH, "/html/body/form/div[3]/div[2]/div[7]/div[1]/h1")
        self.btn_download_boleto = (By.XPATH, '//*[@id="ctl00_ContentBody_ucBoletoLista_rpListaBoleto_ctl00_lkSeleciona"]')
        