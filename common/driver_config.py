from selenium import webdriver
from selenium.webdriver.firefox.options import Options

class WebDriverConfig:
    @staticmethod
    def get_firefox_driver(download_dir, headless=True):
        options = Options()
        
        if headless:
            options.add_argument("--headless")

        options.set_preference("browser.download.folderList", 2)
        options.set_preference("browser.download.dir", download_dir)
        options.set_preference("browser.helperApps.neverAsk.saveToDisk", "application/pdf")
        options.set_preference("pdfjs.disabled", True)
        options.set_preference("browser.download.manager.showWhenStarting", False)

        driver = webdriver.Firefox(options=options)
        return driver