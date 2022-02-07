from selenium import webdriver
from selenium.webdriver import Chrome
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.alert import Alert


driver_path = "Testing/chromedriver.exe"
brave_path = "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe"

option = webdriver.ChromeOptions()
option.binary_location = brave_path

driver = webdriver.Chrome(executable_path=driver_path, chrome_options=option)
#driver = webdriver.Chrome('Testing/chromedriver.exe')

driver.get('file:///C:/Users/hgrya/Documents/SE%20Project/Code/Responsivetrial1/login.html')
print(driver.title)
driver.implicitly_wait(10)

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

print('\nTest case 0 Check for title and signin tab active')
if driver.title == 'Login System' and driver.find_element_by_id("tab-1").is_selected():
    print('Test Case passed')
else:
    print('Test case failed')

try:
    print('\nTest case 5 Check for clicking Forgot Password')
    driver.find_element_by_id('forgot_password').click()
    WebDriverWait(driver, 3).until(EC.alert_is_present(),
                                   'Timed out waiting for PA creation ' +
                                   'confirmation popup to appear.')
    
    obj = driver.switch_to.alert
    obj.send_keys('hey')
    obj.accept()
    
    if obj.text == "Confirm or deny":
        print('...')
        obj.accept()
        WebDriverWait(driver, 3).until(EC.alert_is_present(),
                                   'Timed out waiting for PA creation ' +
                                   'confirmation popup to appear.')
        obj = driver.switch_to.alert                             
        if obj.text == "Entered email is invalid":
            print('Test case passed')
        else:
            print('Test case failed in step1')
        obj.accept()
    else:
        print('Test case failed in step2')
   
    print("alert accepted")
except TimeoutException:
    print("no alert")

try:
    print('\nTest case 6 Check for clicking Forgot Password')
    driver.find_element_by_id('forgot_password').click()
    WebDriverWait(driver, 3).until(EC.alert_is_present(),
                                   'Timed out waiting for PA creation ' +
                                   'confirmation popup to appear.')
    
    obj = driver.switch_to.alert
    obj.send_keys('bot175@gmail.com')
    obj.accept()
    
    if obj.text == "Confirm or deny":
        print('...')
        obj.accept()
        WebDriverWait(driver, 3).until(EC.alert_is_present(),
                                   'Timed out waiting for PA creation ' +
                                   'confirmation popup to appear.')
        obj = driver.switch_to.alert                             
        if obj.text == "Password reset email sent!":
            print('Test case passed')
        else:
            print('Test case failed in step1')
        obj.accept()
    else:
        print('Test case failed in step2')
   
    print("alert accepted")
except TimeoutException:
    print("no alert")



#For signin
flag = -1
for line in test_cases_1:
    flag+=1
    #print(flag)
    if flag == 0:
        continue
    #if flag==1  or flag==9:
    test = line.split(',')
    print('\nTest case '+str(flag)+' For input : ', test)
    val = signIn_test(test[0],test[1])
    #print(val)
    

    if(test[2].strip() == 'TRUE'): x=True
    else: x=False

    if val == x :
        print('Test Case Passed')
    else: print('Test Case Failed')
    driver.save_screenshot('Testing/test1/Screenshots/signin'+str(flag)+'.png')
    
driver.quit()




