from selenium import webdriver
from selenium.webdriver.firefox.options import Options

class WebDriverConfig:
    @staticmethod
    def get_firefox_driver(headless=True):
        options = Options()
        if headless:
            options.add_argument("--headless")
        
        driver = webdriver.Firefox(options=options)
        return driver