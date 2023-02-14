from selenium import webdriver
from selenium.webdriver.chrome.options import Options
options = Options()
options.page_load_strategy = 'normal'
driver = webdriver.Chrome(options=options)
driver.get("https://scan-a-lot-management.firebaseapp.com/")
driver.quit()