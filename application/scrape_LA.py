from bs4 import BeautifulSoup
import requests
import database_struct as ds

def insert_neighborhood(table):

    names = []
    #Looking names of citites/neighborhoods
    for element in table[49:-1]:
        names.append(element[0])

    #Create objects and inserting
    city = ds.City.create(name='Los Angeles')
    for cities in names:
        ds.Neighborhoods.create(name=cities, city=city)


def insert_data(table):
    
    #Uncomment if neighborhoods does not exist
    #insert_neighborhood(table)
    
    #Inserting data into Statistics by City
    for element in table:
        if(element[0] == 'Laboratory Confirmed Cases '):
            cases_city = element[1]
        if(element[0] == 'Deaths'):
            deaths_city = element[1]
           
    try:
        city = ds.City.get(ds.City.name == 'Los Angeles')
        ds.Statistics_by_City.create(cases=cases_city,deaths=deaths_city,
                                                                    city=city)
    except:
        print("Can't insert County L.A into database")
        pass

    #Inserting data into Statistics by Neighborhoods
    for element in table:
       try:
           name_aux = element[0].replace('*', '')
           name_neigh = ds.Neighborhoods.get(ds.Neighborhoods.name==name_aux)
           cases_neigh = element[1]
           deaths_neigh = element[3]
           ds.Statistics_by_Neighborhood.create(cases=cases_neigh, 
                                deaths=deaths_neigh, neighborhood=name_neigh)
       except:
           pass

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
               print("Error around conexion to data base for L.A.")
            

        else:
            print("L.A. server is unreachable")

    
    except AttributeError:
        print("L.A. HTML code was changed")
    except:
        print("Another Error in L.A.")
  

if __name__ == '__main__':
    los_angeles()