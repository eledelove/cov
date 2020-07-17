import database_struct as ds

with open('new_data.txt', 'rt') as file:
    line = file.read()

#Spliting by \n
lista = line.split('\n')

#Update Data for Places
for element in lista:
    data = element.split(',')
    try:
        p = ds.Places.get(ds.Places.name == data[0])
        ds.Statistics_by_Places.create(cases=data[1],deaths=data[2],Place=p)
    except:
        print("No se pudo actualizar", data[0])
        pass