from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import time

class ApsaLoginPage:
    def __init__(self, driver):
        self.url = "https://areaexclusiva.apsa.com.br/digital/login"
        self.driver = driver
        self.input_username_locator = (By.ID, "login")
        self.input_password_locator = (By.XPATH, "/html/body/app-root/ion-app/ion-router-outlet/app-default-layout/ion-app/ion-router-outlet/app-index/ion-content/div/div[2]/app-form-login/form/div[2]/div[1]/input")
        self.btn_entrar_locator = (By.XPATH, "/html/body/app-root/ion-app/ion-router-outlet/app-default-layout/ion-app/ion-router-outlet/app-index/ion-content/div/div[2]/app-form-login/form/div[4]/div[2]/button/div/div")
        self.invalid_login_message_locator = (By.XPATH, "/html/body/popup-mensage-ok/div/div/div[2]/div")
        self.campo_obrigatorio_login_locator = (By.XPATH, "//div[@class='FormGroup_Erro' and contains(text(), 'Campo obrigatório')]")
        self.campo_obrigatorio_senha_locator = (By.XPATH, "//div[@class='FormGroup_Erro' and contains(text(), 'Mínimo de 6 caracteres')]") 

    def login(self, username, password):

        try:
            self.driver.get(self.url)

            wait = WebDriverWait(self.driver, 20)
            input_username_e = wait.until(EC.presence_of_element_located(self.input_username_locator))
            input_password_e = wait.until(EC.presence_of_element_located(self.input_password_locator))
            btn_entrar_e = wait.until(EC.presence_of_element_located(self.btn_entrar_locator))

            time.sleep(2)
            input_username_e.send_keys(username)
            time.sleep(2)
            input_password_e.send_keys(password)
            time.sleep(2)
            btn_entrar_e.click()
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
        wait = WebDriverWait(self.driver, 5)

        try:
            invalid_login_message_e = wait.until(EC.visibility_of_element_located(self.invalid_login_message_locator))
            if invalid_login_message_e:
                print("Erro: Login inválido.")
                return True
        except:
            try:
                campo_obrigatorio_login_e = wait.until(EC.visibility_of_element_located(self.campo_obrigatorio_login_locator))
                if campo_obrigatorio_login_e:
                    print("Erro: Campo de login obrigatório.")
                    return True
            except:
                try:
                    campo_obrigatorio_senha_e = wait.until(EC.visibility_of_element_located(self.campo_obrigatorio_senha_locator))
                    if campo_obrigatorio_senha_e:
                        print("Erro: Campo de senha obrigatório.")
                        return True
                except:
                    return False

    '''def is_invalid_login(self):
        try:
            wait = WebDriverWait(self.driver, 5)

            invalid_login_message_e = wait.until(EC.visibility_of_element_located(self.invalid_login_message_locator))
            if invalid_login_message_e:
                return True
            else:
                campo_obrigatorio_login_e = wait.until(EC.visibility_of_element_located(self.campo_obrigatorio_login_locator))
                if campo_obrigatorio_login_e:
                    return True
                else: 
                    campo_obrigatorio_senha_e = wait.until(EC.visibility_of_element_located(self.campo_obrigatorio_senha_locator))
                    if campo_obrigatorio_senha_e:
                        return True
            
        except:
            return False'''