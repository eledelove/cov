import database_struct as ds
import datetime


def search_data(city, neighborhood, year, month, day):
    
    date = datetime.date(year, month, day)

    #Getting data by city
    try:
        city_obj = ds.City.get(ds.City.name.iregexp(city))
        data_city = ds.Statistics_by_City.get(
                                        (ds.Statistics_by_City.city == city_obj) 
                                        & (ds.Statistics_by_City.date == date))
    except:
        return {'city':'Not'}
    

    #Getting data by neighborhood
    try:
        neigh = ds.Neighborhoods.get((ds.Neighborhoods.city == city_obj) & 
                                (ds.Neighborhoods.name.iregexp(neighborhood)))
        data_neigh = ds.Statistics_by_Neighborhood.get(
                        (ds.Statistics_by_Neighborhood.neighborhood == neigh) & 
                                (ds.Statistics_by_Neighborhood.date == date))
    except:
        return {'neighborhood':'Not'}

    
    response = {
        'city':city_obj.name,
        'cases':data_city.cases,
        'deaths':data_city.deaths,
        'neighborhood':neigh.name,
        'cases_neigh':data_neigh.cases
    }
    return response