#Imports
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time

options = Options()
options.page_load_strategy = 'normal'
driver = webdriver.Chrome(options=options)

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
 
#Set Website
driver.get("https://scan-a-lot-management.firebaseapp.com/")

#Locate Email Field
emailField = driver.find_element("id","email")


#Click on Field
action = ActionChains(driver)
action.click(on_element=emailField)




action.send_keys("test@test.com")
action.perform()

#Locate password Field
passwordField = driver.find_element("id","password")

#Click on Field
action = ActionChains(driver)
action.click(on_element=passwordField)

#Send Password
action.send_keys("Rajah424!")
action.perform()


 
#Find login button based on the xpath
driver.find_element(by=By.XPATH, value='/html/body/div[2]/div/input[3]').click()

#delays 
time.sleep(2.5)

print("WebsiteURL",driver.current_url)

