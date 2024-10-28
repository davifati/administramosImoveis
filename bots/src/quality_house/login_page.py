from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException


class QualityHouseLoginPage:
    def __init__(self, driver):
        self.url = "https://qualityhouse.icondo.com.br/"
        self.driver = driver
        self.input_username_locator = (By.ID, "user_login")
        self.input_password_locator = (By.ID, "user_pass")
        self.btn_confirmar_locator = (By.ID, "wp-submit")
        self.invalid_login_message_locator = (By.ID, "login_error")

    def login(self, username, password):

        try:
            self.driver.get(self.url)

            wait = WebDriverWait(self.driver, 20)
            input_username_e = wait.until(EC.presence_of_element_located(self.input_username_locator))
            input_password_e = wait.until(EC.presence_of_element_located(self.input_password_locator))
            btn_confirmar_e = wait.until(EC.element_to_be_clickable(self.btn_confirmar_locator))

            input_username_e.send_keys(username)
            input_password_e.send_keys(password)
            btn_confirmar_e.click()
            print("Preencheu username, password e clicou em ok.")

            if self.is_invalid_login():
                print(f"Login inválido para o usuário {username}")
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
            invalid_login_message_e = wait.until(EC.presence_of_element_located(self.invalid_login_message_locator))
            return True
        except:
            return False
            