from selenium import webdriver
from selenium.webdriver.firefox.options import Options
import requests
import os

class WebDriverConfig:
    @staticmethod
    def get_firefox_driver(download_dir, headless=True, download=True):
        options = Options()
        
        if headless:
            options.add_argument("--headless")

        if not os.path.exists(download_dir):
            os.makedirs(download_dir)
        
        if download:
            options.set_preference("browser.download.folderList", 2)  
            options.set_preference("browser.download.dir", os.path.abspath(download_dir))  
            options.set_preference("browser.helperApps.neverAsk.saveToDisk", "application/pdf,application/octet-stream")  
            options.set_preference("pdfjs.disabled", True) 
            options.set_preference("browser.download.manager.showWhenStarting", False)  
            options.set_preference("browser.download.useDownloadDir", True)
            options.set_preference("browser.download.panel.shown", False)
            options.set_preference("browser.download.manager.showAlertOnComplete", False)
            options.set_preference("browser.download.animateNotifications", False)
        else:
            options.set_preference("pdfjs.disabled", False)  
            options.set_preference("browser.helperApps.neverAsk.saveToDisk", "")
        
        driver = webdriver.Firefox(options=options)
        return driver

