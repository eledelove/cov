function parsePlaces(data){
    var neighborhood = "Sin información";
    var places = {
        "Klein Boulevard":"Federal Prison in Lompoc",
        "Tenth Street":"Robert Presley Detention Center",
        "Orange Street":"Robert Presley Detention Center",
        "Lemon Street":"Robert Presley Detention Center",
        "Wiley's Well Road":"Chuckawalla Valley State Prison",
        "Blythe":"Ironwood State Prison"
    };
    if(places[data]!=undefined){
        neighborhood = places[data];
    }
    return neighborhood;
}