
import random

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
driver.implicitly_wait(10)


test_cases_2 = open("Testing/test_cases_1-2.csv", "r")



SU_email_addr_box = driver.find_element(By.ID,'email')
SU_password_box = driver.find_element(By.ID,'password')
SU_name_box = driver.find_element(By.ID,'name')
SU_phn_box = driver.find_element(By.ID,'phnumber')
SU_submit_button = driver.find_element(By.ID,'submit')


timeout = 2
timeout1 = 5 #for elements that take more time loading


def clearSU():
    SU_email_addr_box.clear()
    SU_password_box.clear()
    SU_name_box.clear()
    SU_phn_box.clear()



def signUP_test(email,password,name,phn):
    accepted = False

    driver.find_element(By.ID,'SUtab').click()

    SU_email_addr_box.send_keys(email) 
    SU_password_box.send_keys(password)
    SU_name_box.send_keys(name)
    SU_phn_box.send_keys(phn)
    SU_submit_button.click()

    try:
        WebDriverWait(driver,timeout).until(EC.alert_is_present())
        alert = driver.switch_to.alert
        alert.accept() 
        print("SignUp successful - Alert accepted")
        accepted = True
        return accepted
    except:
        print('...No Alert Found, Checking for errors...')

    try:
        WebDriverWait(driver,timeout1).until(EC.visibility_of_element_located((By.ID, 'error-label')))
        print(driver.find_element(By.ID,'error-label').text)
        clearSU()
        return accepted
    except:
        print('....')

    print('SignUp unsuccesful')
    clearSU()
    return accepted    

    # if(driver.find_element(By.ID("tab-1")).is_selected()=="False"):
    #     print("SignUp successful - Alert accepted")
    #     accepted = True
    #     return accepted
    # else:
    #     print("Signup unsuccessful")

    
        
    
    

    
'''
signUP_test("hey","hey","hey","123") #invalid phn
signUP_test("hey","hey","hey","9988776655") #invalid email
signUP_test("harikiran.2136@gmail.com","hey123","hey","9988776655") #email already exists
signUP_test(rand_email,"qwe","hey","9988776655") #invalid password
signUP_test(rand_email,"qwerty123","MyName","9988776655") #accepted
'''
#for signUp
flag = -1
for line in test_cases_2:
    flag+=1
    if flag == 0:
        continue
    #if flag==1  or flag==9:
    test = line.split(',')
    print('Test case '+str(flag)+' For input : ', test)
    if test[0]!="rand_email":
        val = signUP_test(test[0],test[1],test[2],test[3])
    else:
        rand_email = 'bot' + str(random.randrange(1,1000)) + '@gmail.com'
        print('random email :',rand_email)
        val = signUP_test(rand_email,test[1],test[2],test[3])
    #print(val)
    

    if(test[4].strip() == 'TRUE'): x=True
    else: x=False

    if val == x :
        print('Test Case Passed')
    else: print('Test Case Failed')
    driver.save_screenshot('Testing/test1/Screenshots/signup'+str(flag)+'.png')

driver.quit()







