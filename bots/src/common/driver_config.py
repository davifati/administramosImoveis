from selenium import webdriver
from selenium.webdriver.firefox.options import Options

class WebDriverConfig:
    @staticmethod
    def get_firefox_driver(download_dir, headless=True, download=True):
        options = Options()
        
        if headless:
            options.add_argument("--headless")
        
        if download:
            options.set_preference("browser.download.folderList", 2)  
            options.set_preference("browser.download.dir", download_dir)  
            options.set_preference("browser.helperApps.neverAsk.saveToDisk", "application/pdf")  
            options.set_preference("pdfjs.disabled", True)  
            options.set_preference("browser.download.manager.showWhenStarting", False)  
        else:
            options.set_preference("pdfjs.disabled", False)  
            options.set_preference("browser.helperApps.neverAsk.saveToDisk", "")

        driver = webdriver.Firefox(options=options)
        return driver