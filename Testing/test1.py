
from random import random

from selenium import webdriver
from selenium.webdriver import Chrome
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException


driver_path = "Testing/chromedriver.exe"
brave_path = "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe"

option = webdriver.ChromeOptions()
option.binary_location = brave_path

driver = webdriver.Chrome(executable_path=driver_path, chrome_options=option)
#driver = webdriver.Chrome('Testing/chromedriver.exe')

driver.get('file:///C:/Users/hgrya/Documents/SE%20Project/Code/Responsivetrial1/login.html')
print(driver.title)
driver.implicitly_wait(5)

SI_email_addr_box = driver.find_element(By.ID,'email1')
SI_password_box = driver.find_element(By.ID,'password1')
SI_submit_button = driver.find_element(By.ID,"submit1")
SI_error = driver.find_element(By.ID,'error-label1').text

SU_email_addr_box = driver.find_element(By.ID,'email')
SU_password_box = driver.find_element(By.ID,'password')
SU_name_box = driver.find_element(By.ID,'name')
SU_phn_box = driver.find_element(By.ID,'phnumber')
SU_submit_button = driver.find_element(By.ID,'submit')
SU_error = driver.find_element(By.ID,'error-label').text

timeout = 2
timeout1 = 5 #for elements that take more time loading

def clearSI():
    SI_email_addr_box.clear()
    SI_password_box.clear()

def clearSU():
    SU_email_addr_box.clear()
    SU_password_box.clear()
    SU_name_box.clear()
    SU_phn_box.clear()

def signIn_test(email,password):  
    accepted = False

    SI_email_addr_box.send_keys(email) 
    SI_password_box.send_keys(password)
    SI_submit_button.click()

    try:
        WebDriverWait(driver,timeout).until(EC.visibility_of_element_located((By.ID, 'error-label1')))
        print(SI_error)
        clearSI()
        return accepted
    except:
        print('...')
        

    try:
        WebDriverWait(driver,timeout1).until(EC.title_is('Assist - Index'))   
        print('Test Passed')
        accepted = True
        return accepted
    except TimeoutException:
        print('Timed out for wait2')
        print('SignIn failed')

    clearSI()
    return accepted
    


def signUP_test(email,password,name,phn):
    accepted = False

    driver.find_element(By.ID,'SUtab').click()

    SU_email_addr_box.send_keys(email) 
    SU_password_box.send_keys(password)
    SU_name_box.send_keys(name)
    SU_phn_box.send_keys(phn)
    SU_submit_button.click()

    try:
        WebDriverWait(driver,timeout).until(EC.visibility_of_element_located((By.ID, 'error-label')))
        print(driver.find_element(By.ID,'error-label').text)
        clearSU()
        return accepted
    except:
        print('....')
        

    try:
        WebDriverWait(driver,timeout1).until(EC.alert_is_present())
        alert = driver.switch_to.alert
        alert.accept()
        print("SignUp successful - Alert accepted")
        accepted = True
        return accepted
    except TimeoutException:
        print('Timed out for wait4')
        
    clearSU()
    return accepted
    
'''
signIn_test("hey","qwerty123") #invalid email
signIn_test("harikiran.2136@gmail.com","qwerty") #invalid password
signIn_test("hey@gmail.com","qwerty123") #email not found
signIn_test("harikiran.2136@gmail.com","admin123") #passing
'''

rand_email = 'bot' + str(random.randrange(1,100)) + '@gmail.com'
print('random email :',rand_email)

signUP_test("hey","hey","hey","123") #invalid phn
signUP_test("hey","hey","hey","9988776655") #invalid email
signUP_test("harikiran.2136@gmail.com","hey123","hey","9988776655") #email already exists
signUP_test(rand_email,"qwe","hey","9988776655") #invalid password
signUP_test(rand_email,"qwerty123","MyName","9988776655") #accepted

driver.quit()







