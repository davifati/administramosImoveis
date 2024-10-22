from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException


class BapLoginPage:
    def __init__(self, driver):
        self.url = "https://www.bap.com.br/area-do-cliente/"
        self.url_bap_extranet = "https://extranet.bap.com.br/"
        self.url_bap_live = "https://live.bap.com.br/"
        self.driver = driver
        self.input_bap_extranet_cliente_usuario_locator = (By.ID, "cliente_usuario")
        self.input_bap_extranet_cliente_senha_locator = (By.ID, "cliente_senha")
        self.btn_bap_extranet_autenticar_locator = (By.XPATH, "/html/body/table[2]/tbody/tr/td/form/table/tbody/tr[4]/td/input")
        self.bap_extranet_invalid_login_message_locator = (By.XPATH, "/html/body/table[2]/tbody/tr/td/form/table/tbody/tr[2]/td")
        self.bap_live_input_login_locator = (By.ID, "ucLoginSistema_tbNomeEntrar")
        self.bap_live_input_password_locator = (By.ID, "ucLoginSistema_tbSenhaEntrar")
        self.btn_bap_live_entrar_locator = (By.ID, "ucLoginSistema_btEntrar")
        self.bap_live_invalid_login_message_locator = (By.ID, "ucLoginSistema_lbErroEntrar")

    def login(self, username, password):

        try:
            self.driver.get(self.url_bap_extranet)

            wait = WebDriverWait(self.driver, 20)
            input_cliente_usuario_e = wait.until(EC.presence_of_element_located(self.input_bap_extranet_cliente_usuario_locator))
            input_cliente_senha_e = wait.until(EC.presence_of_element_located(self.input_bap_extranet_cliente_senha_locator))
            btn_autenticar_e = wait.until(EC.presence_of_element_located(self.btn_bap_extranet_autenticar_locator))

            input_cliente_usuario_e.send_keys(username)
            input_cliente_senha_e.send_keys(password)
            btn_autenticar_e.click()
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
            invalid_login_message_e = wait.until(EC.visibility_of_element_located(self.btn_bap_extranet_autenticar_locator))
            return True
        except:
            return False