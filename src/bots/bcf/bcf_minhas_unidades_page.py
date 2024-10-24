from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from administramosImoveis.src.bots.protel.utils import normalize_text

class BcfMinhasUnidadesPage:
    def __init__(self, driver):
        self.driver = driver
        self.url = "https://app.bcfadm.com.br/Portal/Unidade.aspx?menu"
        self.content_minhas_unidades_locator = (By.XPATH, "/html/body/form/div[3]/div[2]/div[7]/div[2]")
        self.minhas_unidades_title_locator = (By.XPATH, "/html/body/form/div[3]/div[2]/div[7]/div[1]/h1")
        self.unidades_locator = (By.CLASS_NAME, "documento")
        self.condominio_nome_completo_locator = (By.XPATH, ".//span[contains(@id, 'lblistaEmpreendimentoNome')]")
        self.proprietario_td_locator = (By.XPATH, ".//td[label[contains(text(), 'PROPRIETÁRIO')]]")
        self.btn_alterar_locator = (By.XPATH, ".//a[contains(@title, 'Alterar unidade')]")

    def check_unidade_and_click(self, condominio_text, owner_text):
        try:
            wait = WebDriverWait(self.driver, 20)
            condominio_text = normalize_text(condominio_text)
            owner_text = normalize_text(owner_text)

            unidades_e = wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, "documento")))

            for unidade_e in unidades_e:
                try:
                    condominio_nome_completo = unidade_e.find_element(By.XPATH, ".//span[contains(@id, 'lbListaEmpreendimentoNome')]").text
                    condominio_nome = condominio_nome_completo.split("-", 1)[-1].strip()

                    proprietario_td = unidade_e.find_element(By.XPATH, ".//td[label[contains(text(), 'PROPRIETÁRIO')]]")
                    proprietario_nome = proprietario_td.get_attribute('innerText').replace("PROPRIETÁRIO / OWNER", "").strip()

                    condominio_nome = normalize_text(condominio_nome)
                    proprietario_nome = normalize_text(proprietario_nome)

                    if condominio_text in condominio_nome and owner_text in proprietario_nome:
                        print(f"Condomínio e proprietário correspondem: {condominio_text}, {owner_text}")
                        
                        btn_alterar_e = unidade_e.find_element(By.XPATH, ".//a[contains(@title, 'Alterar unidade')]")
                        btn_alterar_e.click()
                        print("Clicou no botão de alterar unidade.")
                        return True 

                except NoSuchElementException as e:
                    print(f"Elemento não encontrado nesta unidade: {e}")
                    continue

            print("Condomínio e proprietário não encontrados.")
            return False

        except Exception as e:
            print(f"Ocorreu um erro ao buscar unidades: {e}")
            return False