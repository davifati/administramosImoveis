from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class BcfMinhasUnidadesPage:
    def __init__(self, driver):
        self.driver = driver
        self.url = "https://app.bcfadm.com.br/Portal/Unidade.aspx?menu"
        self.content_minhas_unidades_locator = (By.XPATH, "/html/body/form/div[3]/div[2]/div[7]/div[2]")
        self.minhas_unidades_title_locator = (By.XPATH, "/html/body/form/div[3]/div[2]/div[7]/div[1]/h1")
        