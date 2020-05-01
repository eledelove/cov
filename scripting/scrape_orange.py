from bs4 import BeautifulSoup
import requests
import database_struct as ds

def insert_neighborhood(table):

    names = []
    #Looking for names
    for element in table[1:-4]:
        names.append(element[0])
    
    #Create objects and inserting
    city = ds.City.create(name='Orange')
    for cities in names:
        ds.Neighborhoods.create(name=cities, city=city)

def insert_data(table):

    #Uncomment if neighborhoods does not exist
    #insert_neighborhood(table)

    #Inserting data into Statistics by City
    cases_city = table[-2][2]
    deaths_city = table[-1][0]
    city = ds.City.get(ds.City.name == 'Orange')
    ds.Statistics_by_City.create(cases=cases_city,deaths=deaths_city, city=city)
    
    #Inserting data into Statistics by Neighborhoods
    for element in table[1:-4]:
        name_neigh = ds.Neighborhoods.get(ds.Neighborhoods.name == element[0])
        cases_neigh = element[2]
        ds.Statistics_by_Neighborhood.create(cases=cases_neigh, 
                                                        neighborhood=name_neigh)

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

            

            #Looking Total Deaths
            containers = soup.find('div', {'class':'row text-center'})
            table = containers.find('div', {'class':'row'})
            columne = table.find('div', {'class':'col-md-4 col-sm-6 col-xs-12'})
            deaths = columne.find('div', {'class':'panel-body text-center'})
            d = [deaths.h1.text]
            data_in_table.append(d)

            try:
                insert_data(data_in_table)
            except:
                print("Error around conexion to data base")
        else:
            print("L.A. server is unreachable")

    except AttributeError:
        print("Orange HTML code was changed")
    except:
        print("Another Error")

    

if __name__ == '__main__':
    orange()