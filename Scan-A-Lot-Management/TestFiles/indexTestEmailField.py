#Imports
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
options = Options()
options.page_load_strategy = 'normal'
driver = webdriver.Chrome(options=options)
# driver = webdriver.Firefox()

#Set Website
driver.get("https://scan-a-lot-management.firebaseapp.com/")

#Locate Email Field
emailField = driver.find_element("id","email")

#Click on Field
action = ActionChains(driver)
action.click(on_element=emailField)

#Type value
action.send_keys("Admin")
action.perform()

#Print out result and end Script
print('First Value:', emailField.get_attribute('value'))

#Type value
action.send_keys(Keys.BACKSPACE + Keys.BACKSPACE + Keys.BACKSPACE + Keys.BACKSPACE + Keys.BACKSPACE)
action.send_keys("curtis.schrack@stvincent.edu")
action.perform()

#Print out result and end Script
print('Second Value:', emailField.get_attribute('value'))
driver.quit()