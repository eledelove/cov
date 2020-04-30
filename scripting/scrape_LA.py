from bs4 import BeautifulSoup
import requests
from requests_html import HTMLSession

def los_angeles():

    try:
        
        #Getting status sever from L.A
        source = requests.get('http://publichealth.lacounty.gov/media/'+
                                                    'coronavirus/locations.htm')

        if source.status_code == 200:

            #Parsing to BeautifulSoup format           
            soup = BeautifulSoup(source.text, 'lxml')
            #Looking data 
            table = soup.find('table', {'class':'table table-striped'+
                                                    ' table-bordered table-sm'})
            elements_of_table = []

            #Extracting data
            for tr in table.find_all('tr'):
                rows = [td.text for td in tr.find_all('td')]
                elements_of_table.append(rows)

            for item in elements_of_table:
                print(item)


            print("Total cases:", elements_of_table[1][1])
            print("Total Deaths:", elements_of_table[6][1])
        else:
            pass

    
    except AttributeError:
        print("L.A. HTML code was changed")
    except:
        print("L.A. server is unreachable")
  

if __name__ == '__main__':
    los_angeles()
