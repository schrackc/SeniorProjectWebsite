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


#Locate password Field
passwordField = driver.find_element("id","password")

#Click on Field
action = ActionChains(driver)
action.click(on_element=passwordField)



#Send Password
action.send_keys("Rajah424!")
action.perform()

print('First Value:', passwordField.get_attribute('value'))
driver.quit()
