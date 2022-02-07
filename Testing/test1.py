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

test_cases_1 = open("Testing/test_cases_1-1.csv", "r")


SI_email_addr_box = driver.find_element(By.ID,'email1')
SI_password_box = driver.find_element(By.ID,'password1')
SI_submit_button = driver.find_element(By.ID,"submit1")

timeout = 2
timeout1 = 5 #for elements that take more time loading

def clearSI():
    SI_email_addr_box.clear()
    SI_password_box.clear()

def signIn_test(email,password):  
    accepted = False

    SI_email_addr_box.send_keys(email) 
    SI_password_box.send_keys(password)
    SI_submit_button.click()

    try:
        WebDriverWait(driver,timeout).until(EC.visibility_of_element_located((By.ID, 'error-label1')))
        SI_error = driver.find_element(By.ID,'error-label1').text
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
    



    
'''
signIn_test("hey","qwerty123") #invalid email
signIn_test("harikiran.2136@gmail.com","qwerty") #invalid password
signIn_test("hey@gmail.com","qwerty123") #email not found
signIn_test("harikiran.2136@gmail.com","admin123") #passing
'''
'''

'''



#For signin
flag = -1
for line in test_cases_1:
    flag+=1
    print(flag)
    if flag == 0:
        continue
    #if flag==1  or flag==9:
    test = line.split(',')
    print('Test case '+str(flag)+' For input : ', test)
    val = signIn_test(test[0],test[1])
    #print(val)
    

    if(test[2].strip() == 'TRUE'): x=True
    else: x=False

    if val == x :
        print('Test Case Passed')
    else: print('Test Case Failed')
    driver.save_screenshot('Testing/test1/Screenshots/signin'+str(flag)+'.png')
    





