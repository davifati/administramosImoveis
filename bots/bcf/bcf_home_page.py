from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException


class BcfHomePage:
    def __init__(self, driver):
        self.url = "https://app.bcfadm.com.br/Portal/Home.aspx"
        self.driver = driver
        self.home_link_locator = (By.ID, "ucMenuV_lkHome")
        self.btn_financeiro_locator = (By.XPATH, "/html/body/form/div[3]/aside/div/div[4]/div[2]/a")
        self.btn_segunda_boleto_locator = (By.XPATH, "/html/body/form/div[3]/aside/div/div[4]/div[2]/div[1]/a")
        self.btn_meus_dados_locator = (By.XPATH, "/html/body/form/div[3]/aside/div/div[4]/div[1]/a")
        self.btn_minhas_unidades_locator = (By.XPATH, "/html/body/form/div[3]/aside/div/div[4]/div[1]/div/a")

    def check_login_success(self):
        try:
            wait = WebDriverWait(self.driver, 20)
            wait.until(EC.element_to_be_clickable(self.home_link_locator))
            print("Login bem-sucedido e home page carregada.")
            return True
        except Exception as e:
            print(f"Erro ao verificar login: {e}")
            return False

    def click_segunda_via_boleto(self):
        try:
            wait = WebDriverWait(self.driver, 20)
            
            btn_financeiro_e = wait.until(EC.element_to_be_clickable(self.btn_financeiro_locator))
            btn_financeiro_e.click()

            btn_segunda_boleto_e = wait.until(EC.element_to_be_clickable(self.btn_segunda_boleto_locator))
            btn_segunda_boleto_e.click()
            print("Botão de segunda via clicado com sucesso.")
            return True
        except Exception as e:
            print(f"Erro ao clicar no botão segunda via: {e}")
            return False
    
    def click_minhas_unidades(self):
        try:
            wait = WebDriverWait(self.driver, 20)

            btn_meus_dados_e = wait.until(EC.element_to_be_clickable(self.btn_meus_dados_locator))
            btn_meus_dados_e.click()

            btn_minhas_unidades_e = wait.until(EC.element_to_be_clickable(self.btn_meus_dados_locator))
            btn_minhas_unidades_e.click()
            print("Botão de minhas unidades clicado com suceso.")
            return True
        except Exception as e:
            print(f"Erro ao clicar no botão segunda via: {e}")

