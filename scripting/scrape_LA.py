from bs4 import BeautifulSoup
import requests
import database_struct as ds

def insert_neighborhood(table):

    names = []
    #Looking names of neighborhoods
    for element in table[45:-1]:
        names.append(element[0])

    #Create objects and inserting
    city = ds.City.create(name='Los Angeles')
    for cities in names:
        ds.Neighborhoods.create(name=cities, city=city)


def insert_data(table):
    
    #Uncomment if neighborhoods does not exist
    #insert_neighborhood(table)

    #Inserting data into Statistics by City
    cases_city = table[1][1]
    deaths_city = table[6][1]
    city = ds.City.get(ds.City.name == 'Los Angeles')
    ds.Statistics_by_City.create(cases=cases_city,deaths=deaths_city, city=city)

    #Inserting data into Statistics by Neighborhoods
    for element in table[45:-1]:
        name_neigh = ds.Neighborhoods.get(ds.Neighborhoods.name == element[0])
        cases_neigh = element[1]
        ds.Statistics_by_Neighborhood.create(cases=cases_neigh, 
                                                        neighborhood=name_neigh)


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
            
            try:
                insert_data(elements_of_table)
            except:
                print("Error around conexion to data base")
            

        else:
            print("L.A. server is unreachable")

    
    except AttributeError:
        print("L.A. HTML code was changed")
    except:
        print("Another Error")
  

if __name__ == '__main__':
    los_angeles()
