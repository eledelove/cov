import database_struct as ds

#----script for insert latitude and longitude------------------

name = 'angeles.txt'
#Reading data.txt file
with open(name, 'rt') as file:
    line = file.read()

#Spliting by \n
lista = line.split('\n')

#update data into database
for i in lista:
    data = i.split(',')
    try:
        query =ds.Neighborhoods.update(
        {ds.Neighborhoods.latitude:data[1], ds.Neighborhoods.longitude:data[2]}
        ).where(ds.Neighborhoods.name == [data[0]])
        query.execute()
    except:
        pass