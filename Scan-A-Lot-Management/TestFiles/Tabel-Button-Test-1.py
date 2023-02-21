#Imports
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
options = Options()
options.page_load_strategy = 'normal'
driver = webdriver.Chrome(options=options)

#Set Website
driver.get("https://scan-a-lot-management.firebaseapp.com/data-tables.html")

# Find the button and wait until it is clickable
#button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, "Officers")))
driver.find_element(by=By.XPATH, value='/html/body/div[2]/button[1]').click()


# Verify that the button click had the expected result
assert "New Page Title" in driver.title

# Close the browser
driver.quit()