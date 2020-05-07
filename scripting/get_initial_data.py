import database_struct as ds
import datetime
import json

def get_initial_data():

    date = datetime.date.today()
    #Get all counties
    lista = []
    try:
        counties = ds.City.select()
        #adding all data in a list
        for i in counties:
            data = ds.Statistics_by_City.get((ds.Statistics_by_City.city == i) & 
                                        (ds.Statistics_by_City.date == date))
            d = {'county':i.name, 'cases':data.cases, 'deaths':data.deaths, 
                                'latitude':i.latitude, 'longitude':i.longitude}
            lista.append(d)
    except:
        d = {'county':'No data'}
        lista.append(d)

    lista_n = []
    max_cases = []
    #Get all cities and neighborhoods
    try:
        neighs = ds.Neighborhoods.select()
        for i in neighs:
            data = ds.Statistics_by_Neighborhood.get(
                            (ds.Statistics_by_Neighborhood.neighborhood == i) & 
                                (ds.Statistics_by_Neighborhood.date == date))
            d = {'city':i.name, 'cases':data.cases, 'deaths':data.deaths, 
                                'latitude':i.latitude, 'longitude':i.longitude}
            max_cases.append(int(data.cases))
            lista_n.append(d)
        num_max = max(max_cases)
        max_cases.remove(num_max)
        second_max = max(max_cases)
    except:
        d = {'city':'No data'}
        lista_n.append(d)


    dictio = {'counties':lista, 'cities':lista_n, 'max_cases':num_max, 
                                                'second_max_cases':second_max}
    return json.dumps(dictio)