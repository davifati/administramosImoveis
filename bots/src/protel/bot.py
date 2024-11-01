import os
import sys
import os

sys.path.append(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
)

from bots.bots.protel.login_page import ProtelLoginPage
from bots.bots.protel.home_page import ProtelHomePage
from bots.bots.protel.download_page import ProtelDownloadPage
from common.driver_config import WebDriverConfig


class ProtelBot:

    def __init__(self) -> None:
        current_directory = os.getcwd()
        self.download_dir = os.path.join(current_directory, "downloads")

        self.driver = WebDriverConfig.get_firefox_driver(
            download_dir=self.download_dir, download=True, headless=True
        )
        self.login_page = ProtelLoginPage(self.driver)
        self.home_page = ProtelHomePage(self.driver)
        self.download_page = ProtelDownloadPage(self.driver)

    def run(self, username, password, endereco, idImobiliaria) -> None:
        try:
            if not self.login_page.login(username, password):
                print(
                    f"Login falhou para o usuário {username}. Pulando para o próximo."
                )
                return

            if self.home_page.check_login_success():
                self.home_page.click_boleto()

                boleto_disponivel = self.download_page.check_boleto(endereco, idImobiliaria)

                if boleto_disponivel:
                    print("Download do boleto realizado com sucesso.")
        finally:
            self.driver.quit()
            print(f"Processo finalizado para usuário: {username}.\n")
