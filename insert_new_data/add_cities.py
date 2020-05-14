import database_struct as ds

with open('add_cities.txt', 'rt') as file:
    line = file.read()

#Spliting by \n
lista = line.split('\n')
#Getting name of the city
county = lista[0]
lista.remove(county)

#Get object
try:
    county_obj = ds.City.get(ds.City.name == county)
except:
    print(f"No se pudo enconrar \"{county}\" en la base de datos")


#Inserting new localities/neighborhoods in database
for i in lista:
    data = i.split(',')
    try:
        ds.Neighborhoods.create(name=data[0], latitude=data[1], longitude=data[2],
                                                                city=county_obj)
    except:
        pass