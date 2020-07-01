import database_struct as ds
import datetime
import json

def get_data_by_date(year, month, day):

    list_cities = []

    date = datetime.date(year, month, day)
    #Getting Statistics by city
    try:
        condados = ds.City.select()
        for c in condados:
            try:
                data=ds.Statistics_by_City.get((ds.Statistics_by_City.city == c)&
                                            (ds.Statistics_by_City.date == date))

                d = {'county':c.name, 'cases':data.cases, 'deaths':data.deaths, 
                                                        'date':str(data.date)}
                list_cities.append(d)
            except:
                pass
            if len(list_cities) == 0:
                d = {'county':'No Data', 'date':str(date)}
                list_cities.append(d)
    except:
        d = {'county':'No Data', 'date':str(date)}
        list_cities.append(d)
        pass

    list_neigh = []
    cases = []

    #Getting Statistics by neighborhoods
    try:
        neighborhoods = ds.Neighborhoods.select()
        for i in neighborhoods:
            try:
                data = ds.Statistics_by_Neighborhood.get(
                                (ds.Statistics_by_Neighborhood.neighborhood == i) & 
                                    (ds.Statistics_by_Neighborhood.date == date))
                d = {'city':i.name, 'cases':data.cases, 'deaths':data.deaths, 
                                    'latitude':i.latitude, 'longitude':i.longitude}
                cases.append(int(data.cases))
                list_neigh.append(d)
            except:
                pass
        
        max_cases = max(cases)
        cases.remove(max_cases)
        second_max = max(cases)


    except:
        max_cases = 'No data'
        second_max = 'No data'
        d = {'city':'No data'}
        list_neigh.append(d)
        pass

    dictio={'counties':list_cities, 'cities':list_neigh, 'max_cases':max_cases, 
                                                'second_max_cases':second_max}
    return json.dumps(dictio)
