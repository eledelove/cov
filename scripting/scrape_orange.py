from bs4 import BeautifulSoup
import requests
from requests_html import HTMLSession

def orange():

    try:
        
        #Getting status server from Orange
        source = requests.get('https://occovid19.ochealthinfo.com/'+
                                                            'coronavirus-in-oc')

        if source.status_code == 200:

            #Parsing to BeautifulSoup format
            soup = BeautifulSoup(source.text, 'lxml')

            #Looking data
            table = soup.find('table', {'class':'table text-right'})

            data_in_table = []

            #Extracting data
            for tr in table.find_all('tr'):
                rows = [td.text for td in tr.find_all('td')]
                data_in_table.append(rows)

            for item in data_in_table:
                print(item)

            #Looking Total Deaths
            containers = soup.find('div', {'class':'row text-center'})
            table = containers.find('div', {'class':'row'})
            columne = table.find('div', {'class':'col-md-4 col-sm-6 col-xs-12'})
            deaths = columne.find('div', {'class':'panel-body text-center'})
            deaths = deaths.h1.text

            print("Total Cases:", data_in_table[-1][2])
            print("Total Deaths:", deaths)

        else:
            pass

    except AttributeError:
        print("Orange HTML code was changed")
    except:
        print("Orange server is unreachable")

    

if __name__ == '__main__':
    orange()