from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import time

class CipaLoginPage:
    def __init__(self, driver):
        self.url = "https://cipafacil.digital/"
        self.driver = driver
        self.input_username_locator = (By.ID, "email")
        self.input_password_locator = (By.ID, "password")
        self.btn_entrar_locator = (By.XPATH, "/html/body/app-root/ion-content/layout/empty-layout/div/div/auth-sign-in/div/div[2]/div/form/button")
        self.invalid_login_message_locator = (By.XPATH, "cipafacil-alert-message ng-tns-c171-3")

    def login(self, username, password):
        try:
            self.driver.get(self.url)
            wait = WebDriverWait(self.driver, 20)
            input_username_e = wait.until(EC.presence_of_element_located(self.input_username_locator))
            input_password_e = wait.until(EC.presence_of_element_located(self.input_password_locator))
            btn_entrar_e = wait.until(EC.presence_of_element_located(self.btn_entrar_locator))

            input_username_e.send_keys(username)
            input_password_e.send_keys(password)
            btn_entrar_e.click()
            print("Preencheu username, password e clicou em ok.")

            if self.is_invalid_login():
                print(f"Login inválido para o usuário: {username}")
                return False
            else:
                return True
    
        except TimeoutException:
            print("O tempo de espera foi excedido. Um ou mais elementos não foram encontrados na página.") 
        except NoSuchElementException:
            print("Um dos elementos não foi encontrado na página. Verifique os localizadores.")
        except Exception as e:
            print(f"Ocorreu um erro inesperado durante o login: {e}")

    def is_invalid_login(self):
        try:
            wait = WebDriverWait(self.driver, 5)
            invalid_login_message_e = wait.until(EC.visibility_of_element_located(self.invalid_login_message_locator))
            return True
        except:
            return False