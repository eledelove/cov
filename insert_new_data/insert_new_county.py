import database_struct as ds

with open('new_county.txt', 'rt') as file:
    line = file.read()

#Spliting by \n
lista = line.split('\n')
#Getting name of the city
county = lista[0]
lista.remove(county)

#Inserting new County in database
try:
    county_obj = ds.City.create(name=county)
except:
    print("No se pudo insertar County")
    pass
#Inserting new localities/neighborhoods in database
for i in lista:
    data = i.split(',')
    try:
        ds.Neighborhoods.create(name=data[0], latitude=data[1], longitude=data[2],
        city=county_obj)
    except:
        pass