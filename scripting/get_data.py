import database_struct as ds
import datetime
import json

def get_initial_data():

    date = datetime.date.today()
    #Get all counties
    counties = ds.City.select()
    lista = []
    
    #adding all data in a list
    for i in counties:
        data = ds.Statistics_by_City.get((ds.Statistics_by_City.city == i) & 
                                        (ds.Statistics_by_City.date == date))
        d = {'county':i.name, 'cases':data.cases, 'deaths':data.deaths, 
                                'latitude':i.latitude, 'longitude':i.longitude}
        lista.append(d)

    lista_n = []
    #Get all cities and neighborhoods
    neighs = ds.Neighborhoods.select()
    for i in neighs:
        data = ds.Statistics_by_Neighborhood.get(
                            (ds.Statistics_by_Neighborhood.neighborhood == i) & 
                            (ds.Statistics_by_Neighborhood.date == date))
        d = {'city':i.name, 'cases':data.cases, 'deaths':data.deaths, 
                                'latitude':i.latitude, 'longitude':i.longitude}
        lista_n.append(d)

    dictio = {'counties':lista, 'cities':lista_n}

    return json.dumps(dictio)


def search_data(city, neighborhood, year, month, day):
    
    date = datetime.date(year, month, day)

    #Getting data by city
    try:
        city_obj = ds.City.get(ds.City.name.iregexp(city))
        data_city = ds.Statistics_by_City.get(
                                        (ds.Statistics_by_City.city == city_obj) 
                                        & (ds.Statistics_by_City.date == date))
    except:
        response = {
            'city':city,
            'cases':'No data',
            'deaths':'No data',
            'neighborhood':neighborhood,
            'cases_neigh':'No data'
        }
        return response
    

    #Getting data by neighborhood
    try:
        neigh = ds.Neighborhoods.get((ds.Neighborhoods.city == city_obj) & 
                                (ds.Neighborhoods.name.iregexp(neighborhood)))
        data_neigh = ds.Statistics_by_Neighborhood.get(
                        (ds.Statistics_by_Neighborhood.neighborhood == neigh) & 
                                (ds.Statistics_by_Neighborhood.date == date))
    except:
        response = {
            'city':city_obj.name,
            'cases':data_city.cases,
            'deaths':data_city.deaths,
            'neighborhood': neighborhood,
            'cases_neigh':'No data'
        }
        return response

    
    response = {
        'city':city_obj.name,
        'cases':data_city.cases,
        'deaths':data_city.deaths,
        'neighborhood':neigh.name,
        'cases_neigh':data_neigh.cases
    }
    return response