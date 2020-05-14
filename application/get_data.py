import database_struct as ds
import datetime
import json

def search_data(city, neighborhood, locality, year, month, day):
    
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
            'cases':'Sin información',
            'deaths':'Sin información',
            'neighborhood':neighborhood,
            'cases_neigh':'Sin información'
        }
        return response
    

    #Getting data by neighborhood
    try:
        neigh = ds.Neighborhoods.get((ds.Neighborhoods.city == city_obj) & 
                                (ds.Neighborhoods.name.iregexp(neighborhood)))
        data_neigh = ds.Statistics_by_Neighborhood.get(
                        (ds.Statistics_by_Neighborhood.neighborhood == neigh) & 
                                (ds.Statistics_by_Neighborhood.date == date))
        neigh_name = neigh.name
        neigh_cases = data_neigh.cases
        neigh_deaths = data_neigh.deaths
    except:
        neigh_name = neighborhood
        neigh_cases = 'Sin información'
        neigh_deaths = 'Sin información'

    #Getting data by locality
    try:
        loca = ds.Neighborhoods.get((ds.Neighborhoods.city == city_obj) & 
                                (ds.Neighborhoods.name.iregexp(locality)))
        data_loca = ds.Statistics_by_Neighborhood.get(
                        (ds.Statistics_by_Neighborhood.neighborhood == loca) & 
                                (ds.Statistics_by_Neighborhood.date == date))
        loca_name = loca.name
        loca_cases = data_loca.cases
        loca_deaths = data_loca.deaths
    except:
        loca_name = locality
        loca_cases = 'Sin información'
        loca_deaths = 'Sin información'
        
  
    response = {
        'city':city_obj.name,
        'cases':data_city.cases,
        'deaths':data_city.deaths,
        'neighborhood':neigh_name,
        'cases_neigh':neigh_cases,
        'deaths_neigh':neigh_deaths,
        'locality':loca_name,
        'cases_loca':loca_cases,
        'deaths_loca':loca_deaths
    }
    
    return response