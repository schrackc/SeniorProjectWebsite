#Imports
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time

#Set Website
options = Options()
options.page_load_strategy = 'normal'
driver = webdriver.Chrome(options=options)
driver.get("https://scan-a-lot-management.firebaseapp.com/")

#Locate Email Field
emailField = driver.find_element("id","email")


#Click on Field
action = ActionChains(driver)
action.click(on_element=emailField)

#Put email information in field
action.send_keys("test@test.com")
action.perform()

#Locate password Field
passwordField = driver.find_element("id","password")

#Click on Field
action = ActionChains(driver)
action.click(on_element=passwordField)

#Put password field information in field
action.send_keys("Rajah424!")
action.perform()
 
#Find login button based on the xpath
driver.find_element(by=By.XPATH, value='/html/body/div[2]/div/input[3]').click()

#Delay load
time.sleep(0.5)

#Printout
print("WebsiteURL:", driver.current_url)
if (driver.current_url == "https://scan-a-lot-management.firebaseapp.com/data-tables.html"):
    print("Pass")

#Locate Logout button
logoutButton = driver.find_element(by=By.XPATH, value="/html/body/div[1]/a[2]/button")

#click button
logoutButton.click()

#Delay load
time.sleep(0.5)

#Printout
print("\nWebsiteURL:", driver.current_url)
if (driver.current_url == "https://scan-a-lot-management.firebaseapp.com/index.html"):
    print("Pass")
else:
    print("fail")
    
#Click back arrow
driver.back()

#Delay load
time.sleep(0.5)

#Printout
print("\nWebsiteURL:", driver.current_url)
if (driver.current_url == "https://scan-a-lot-management.firebaseapp.com/index.html"):
    print("Pass")
else:
    print("fail")

#Close Website
driver.quit()