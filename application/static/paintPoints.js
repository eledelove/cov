function paintPoints(map, data) {
    //Total number of cities
    var numberOfCities = data.cities.length;
    //Total number of places
    var numberOfPlaces = data.places.length;
    //Greater number of cases
    var maxCases = data.max_cases;
    //Second largest number of cases
    var secondMaxCases = data.second_max_cases;
    //One third of second largest number of cases
    var oneThirdMaxCases = Math.trunc(secondMaxCases/3);
    //Two third of second largest number of cases
    var twoThirdMaxCases = oneThirdMaxCases*2;
    //For cities
    for (var i = 0; i < numberOfCities; i++) {
        var pointColor = "";
        //Coordinates of each city where if you would draw the marker
        var coordinates =  {lat: parseFloat(data.cities[i].latitude), 
                            lng: parseFloat(data.cities[i].longitude)};
        //Prison marker
        if(data.cities[i].city=="Federal Prison in Lompoc" || 
           data.cities[i].city=="Robert Presley Detention Center" || 
           data.cities[i].city=="Chuckawalla Valley State Prison" ||
           data.cities[i].city=="Ironwood State Prison"){
            pointColor = "http://maps.google.com/mapfiles/ms/micons/police.png";
        }
        //Green marker
        else if(data.cities[i].cases==0){
            pointColor = "http://labs.google.com/ridefinder/images/mm_20_green.png";
        }
        //Yellow marker
        else if(data.cities[i].cases>0 && 
            data.cities[i].cases<=oneThirdMaxCases){
            pointColor = "http://labs.google.com/ridefinder/images/mm_20_yellow.png";
        }
        //Orange marker
        else if(data.cities[i].cases>oneThirdMaxCases && 
            data.cities[i].cases<=twoThirdMaxCases){
            pointColor = "http://labs.google.com/ridefinder/images/mm_20_orange.png";
        }
        //Red marker
        else if(data.cities[i].cases>twoThirdMaxCases && 
            data.cities[i].cases<maxCases){
            pointColor = "http://labs.google.com/ridefinder/images/mm_20_red.png";
        }
        //Red marker
        else{
            pointColor = "http://labs.google.com/ridefinder/images/mm_20_red.png";
        }
        //Draw marker inside the map
        var marker = new google.maps.Marker({
            position: coordinates,
            map: map,
            icon: {
                url: pointColor
            }
        });
    }
    //For places
    for (var i = 0; i < numberOfPlaces; i++) {
        var pointColor = "";
        //Coordinates of each city where if you would draw the marker
        var coordinates =  {lat: parseFloat(data.places[i].latitude), 
                            lng: parseFloat(data.places[i].longitude)};
        
        //Green marker
        if(data.places[i].cases==0){
            pointColor = "http://labs.google.com/ridefinder/images/mm_20_green.png";
        }
        //Yellow marker
        else if(data.places[i].cases>0 && 
            data.places[i].cases<=oneThirdMaxCases){
            pointColor = "http://labs.google.com/ridefinder/images/mm_20_yellow.png";
        }
        //Orange marker
        else if(data.places[i].cases>oneThirdMaxCases && 
            data.places[i].cases<=twoThirdMaxCases){
            pointColor = "http://labs.google.com/ridefinder/images/mm_20_orange.png";
        }
        //Red marker
        else if(data.places[i].cases>twoThirdMaxCases && 
            data.places[i].cases<maxCases){
            pointColor = "http://labs.google.com/ridefinder/images/mm_20_red.png";
        }
        //Red marker
        else{
            pointColor = "http://labs.google.com/ridefinder/images/mm_20_red.png";
        }
        //Draw marker inside the map
        var marker = new google.maps.Marker({
            position: coordinates,
            map: map,
            icon: {
                url: pointColor
            }
        });
    }
}
