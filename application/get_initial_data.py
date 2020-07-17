import database_struct as ds
import datetime
import json

def get_initial_data():

    list_places = []
    #Get places and statistics
    try:
        places = ds.Places.select()
        for place in places:
            try:
                stat = place.statistics
                if len(stat) == 0:
                    continue       
                data = stat[-1]
                d = {'place':place.name, 'cases':data.cases, 'deaths':data.deaths, 
                        'latitude':place.latitude, 'longitude':place.longitude}
                list_places.append(d)
            except:
                pass
    except:
        d = {'place':'No Data'}
        list_places.append(d)
    

    lista = []
    fechas = []
    #Get last date
    try:
        l_date = ds.Statistics_by_City.select(ds.Statistics_by_City.date).order_by(ds.Statistics_by_City.date.desc()).limit(1)
        for j in l_date:
            fecha = str(j.date)
    except:
        fecha = 'No_Last_Date'
        pass
    #Get all counties
    try:
        counties = ds.City.select()
        #adding all data in a list
        for i in counties:
            try:
                last_date = ds.Statistics_by_City.select(ds.Statistics_by_City.date).order_by(ds.Statistics_by_City.date.desc()).limit(1).where(ds.Statistics_by_City.city == i)
                
                for date_aux in last_date:
                    date = date_aux.date
                    fechas.append(str(date))                   
                    data = ds.Statistics_by_City.get((ds.Statistics_by_City.city == i) & 
                                            (ds.Statistics_by_City.date == date))
                    d = {'county':i.name, 'cases':data.cases, 'deaths':data.deaths, 
                                    'latitude':i.latitude, 'longitude':i.longitude, 
                                                            'date':str(date)}
                    lista.append(d)
            except:
                pass
    except:
        d = {'county':'No data'}
        lista.append(d)

    lista_n = []
    max_cases = []
    #Get all cities and neighborhoods
    try:
        for (j,d) in zip(counties,fechas):
            neighs = j.neighborhoods
            date = d         
            for i in neighs:
                try:
                    data = ds.Statistics_by_Neighborhood.get(
                                (ds.Statistics_by_Neighborhood.neighborhood == i) & 
                                    (ds.Statistics_by_Neighborhood.date == date))
                    d = {'city':i.name, 'cases':data.cases, 'deaths':data.deaths, 
                                    'latitude':i.latitude, 'longitude':i.longitude}
                    max_cases.append(int(data.cases))
                    lista_n.append(d)

                except:
                    pass
            num_max = max(max_cases)
            max_cases.remove(num_max)
            second_max = max(max_cases)
            
    except:
        num_max = 'No data'
        second_max = 'No data'
        d = {'city':'No data'}
        lista_n.append(d)
    
    dictio = {'counties':lista, 'cities':lista_n, 'max_cases':num_max, 
        'second_max_cases':second_max, 'last_date':fecha, 'places':list_places}
    
    return json.dumps(dictio)
    