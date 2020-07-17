import database_struct as ds

with open('new_place.txt', 'rt') as file:
    line = file.read()

#Spliting by \n
lista = line.split('\n')

#Inserting Places into database
for element in lista:
    data = element.split(',')
    try:
        ds.Places.create(name=data[0], latitude=data[1], longitude=data[2])
    except:
        print("No se pudo insertar", data[0])
        pass