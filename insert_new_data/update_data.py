import database_struct as ds

with open('new_data.txt', 'rt') as file:
    line = file.read()

#Spliting by \n
lista = line.split('\n')
#Getting county data
data_county = lista[0].split(',')
county = data_county[0]
cases_county = data_county[1]
deaths_county =  data_county[2]

lista.pop(0)
#Insertind data into Statistics by City
try:
    county_obj = ds.City.get(ds.City.name == county)
    ds.Statistics_by_City.create(cases=cases_county,deaths=deaths_county,
                                                                city=county_obj)
except:
    print("Can't insert Statistics by County")
    pass

#Inserting data into Statistics by Neighborhoods
for i in lista:
    element = i.split(',')
    try:
        name_neigh = ds.Neighborhoods.get(ds.Neighborhoods.name==element[0])
        cases_neigh = element[1]
        ds.Statistics_by_Neighborhood.create(cases=cases_neigh, 
                                                    neighborhood=name_neigh)
    except:
        pass