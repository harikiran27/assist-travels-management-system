from asyncio.windows_events import NULL
from datetime import date
from random import random
import requests
import geocoder
from selenium import webdriver
from selenium.webdriver import Chrome
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import TimeoutException
from PIL import Image


test_cases = open("Testing/test_cases_2.csv", "r")
'''for x in f:
  print(x.split(','))
f.close()
'''
mapboxAccessToken = 'pk.eyJ1IjoiaGFyaWtpcmFuMjciLCJhIjoiY2t5Y3owbGtsMHUycDJ3bzgzNDdlNXU5OSJ9.I4bFvoEA8s8I2A17V9Z2wg';

driver_path = "Testing/chromedriver.exe"
brave_path = "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe"
URL = 'https://api.mapbox.com/directions/v5/mapbox/driving/%s,%s;%s,%s?steps=true&geometries=geojson&access_token=%s'


option = webdriver.ChromeOptions()
option.binary_location = brave_path

driver = webdriver.Chrome(executable_path=driver_path, chrome_options=option)
#driver = webdriver.Chrome('Testing/chromedriver.exe')
driver.implicitly_wait(5)
driver.get('file:///C:/Users/hgrya/Documents/SE%20Project/Code/Responsivetrial1/index.html')
print(driver.title)

action = webdriver.ActionChains(driver)
driver.maximize_window()

timeout = 10
timeout1 = 20

locations = ['Bangalore','Mysore','Hyderabad ','Chennai','Mangalore','Tumkur','Chitradurga','Mumbai','Pune','Colombo']

error_label = driver.find_element(By.ID,'error-label')

name_box = driver.find_element(By.ID,'name')
phn_box = driver.find_element(By.ID,'phn')
date_box = driver.find_element(By.ID,'date')
days_box = driver.find_element(By.ID,'days')
vehicle_class_box = driver.find_element(By.ID,'vehicleType')
time_box = driver.find_element(By.ID,'time')
numOfPpl_box = driver.find_element(By.ID,'numOfPpl')
tripType_box = driver.find_element(By.ID,'tripType')
start_box = driver.find_element(By.XPATH,'//*[@id="geocoder"]/div/input')
dest_box = driver.find_element(By.XPATH,'//*[@id="destGeocoder"]/div/input')

submit_button = driver.find_element(By.ID,"submit_ride_button")



def clearAll():
    name_box.clear()
    phn_box.clear()
    date_box.clear()
    days_box.clear()
    vehicle_class_box.send_keys('Select')
    time_box.clear()
    numOfPpl_box.clear()
    tripType_box.send_keys('Select')
    
    start_box.send_keys('   ')
    action.move_to_element(start_box)
    action.perform()
    #WebDriverWait(driver,timeout1).until(EC.visibility_of_element_located((By.XPATH, '//*[@id="geocoder"]/div/div[2]/button')))
    WebDriverWait(driver,timeout1).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="geocoder"]/div/div[2]/button')))
    driver.find_element(By.XPATH, '//*[@id="geocoder"]/div/div[2]/button').click()
    
    dest_box.send_keys('   ')
    action.move_to_element(dest_box)
    action.perform()
    #WebDriverWait(driver,timeout1).until(EC.visibility_of_element_located((By.XPATH, '//*[@id="destGeocoder"]/div/div[2]/button')))
    WebDriverWait(driver,timeout1).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="destGeocoder"]/div/div[2]/button')))
    driver.find_element(By.XPATH, '//*[@id="destGeocoder"]/div/div[2]/button')

def reachable(start,dest):
    s=geocoder.mapbox(start,key=mapboxAccessToken)
    d=geocoder.mapbox(dest,key=mapboxAccessToken)
    URL = 'https://api.mapbox.com/directions/v5/mapbox/driving/%f,%f;%f,%f?steps=false&geometries=geojson&access_token=%s'%(s.json['lng'],s.json['lat'],d.json['lng'],d.json['lat'],mapboxAccessToken)
    r = requests.get(url=URL)

    if r.json()['routes'] == []:
        print('null')
        return False
    return True




def book_a_ride_test(name,phn,date,days,vClass,time,num,type,start,dest,flag):
    accepted = False
 

    if flag==1:
        WebDriverWait(driver,10).until(EC.element_to_be_clickable((By.XPATH,'//*[@id="hero"]/div/div[2]/div[1]/div/h3/a')))
        #print('1clickable')
        book_a_ride_button = driver.find_element(By.XPATH,'//*[@id="hero"]/div/div[2]/div[1]/div/h3/a')
        book_a_ride_button.click()
        WebDriverWait(driver,10).until(EC.visibility_of_element_located((By.ID,'loadCheck')))

    #print('1')
    
    name_box.send_keys(name)
    phn_box.send_keys(phn)
    date_box.send_keys(date)
    days_box.send_keys(days)
    vehicle_class_box.send_keys(vClass)
    time_box.send_keys(time)
    numOfPpl_box.send_keys(num)
    tripType_box.send_keys(type)


    start_box.send_keys(start)
    WebDriverWait(driver,10).until(EC.visibility_of_element_located((By.XPATH, '//*[@id="geocoder"]/div/div[1]/ul')))
    start_box.send_keys(Keys.RETURN)

    dest_box.send_keys(dest)
    WebDriverWait(driver,10).until(EC.visibility_of_element_located((By.XPATH, '//*[@id="destGeocoder"]/div/div[1]/ul')))
    dest_box.send_keys(Keys.RETURN)

    WebDriverWait(driver,10).until(EC.element_to_be_clickable((By.ID,"submit_ride_button")))
    #print('clickable')
    submit_button = driver.find_element(By.ID,'submit_ride_button')
    submit_button.click()
 

    #print('2')
    try:
        #WebDriverWait(driver,10).until(EC.presenceOfElementLocated(By.XPATH("//*[@id='error-label'][contains(@style, 'color: red')]")))
        WebDriverWait(driver,10).until(EC.visibility_of_element_located((By.ID, 'error-label')))
        print(error_label.text)
        #clearAll()
        return accepted
    except:
        print('....')
        

    try:
        WebDriverWait(driver,10).until(EC.alert_is_present())
        alert = driver.switch_to.alert
        alert.accept()
        print("Booking successful - Alert accepted")
        accepted = True
        return accepted
    except TimeoutException:
        print('Timed out for wait')
    
    
    

#accepted :
book_a_ride_test('Bot','1234567890','10-02-2022','5','Sedan','11:11PM','4','Pick',locations[0],locations[9],1)




# flag = -1
# for line in test_cases:
#     flag+=1
#     if flag == 0:
#         continue
#     test = line.split(',')
#     print('Test case '+str(flag)+' For input : ', test)
#     val = book_a_ride_test(test[0],test[1],test[2],test[3],test[4],test[5],test[6],test[7],test[8],test[9],flag)
#     #print(val)
    

#     if(test[10].strip() == 'TRUE'): x=True
#     else: x=False

#     if val == x :
#         print('Test Case Passed')
#     else: print('Test Case Failed')
#     driver.save_screenshot('Testing/Screenshots/'+str(flag)+'.png')
#     clearAll()

# driver.quit()
