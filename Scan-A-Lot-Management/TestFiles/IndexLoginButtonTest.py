#Imports
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

options = Options()
options.page_load_strategy = 'normal'
driver = webdriver.Chrome(options=options)

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
 
#Set Website
driver.get("https://scan-a-lot-management.firebaseapp.com/")

#find the id of the button
 
#loginField = driver.find_element('/html/body/div[2]/div/input[3]').click()
driver.find_element(by=By.XPATH, value='/html/body/div[2]/div/input[3]').click()