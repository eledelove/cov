function paintPoints(map, data) {
    //Total number of cities
    var numberOfCities = data.cities.length;
    //Greater number of cases
    var maxCases = data.max_cases;
    //Second largest number of cases
    var secondMaxCases = data.second_max_cases;
    //One third of second largest number of cases
    var oneThirdMaxCases = Math.trunc(secondMaxCases/3);
    //Two third of second largest number of cases
    var twoThirdMaxCases = oneThirdMaxCases*2;

    for (var i = 0; i < numberOfCities; i++) {
        var pointColor = "";
        //Coordinates of each city where if you would draw the marker
        var coordinates =  {lat: parseFloat(data.cities[i].latitude), 
                            lng: parseFloat(data.cities[i].longitude)};
        //Green marker
        if(data.cities[i].cases==0){
            pointColor = "mm_20_green.png";
        }
        //Yellow marker
        else if(data.cities[i].cases>0 && 
            data.cities[i].cases<=oneThirdMaxCases){
            pointColor = "mm_20_yellow.png";
        }
        //Orange marker
        else if(data.cities[i].cases>oneThirdMaxCases && 
            data.cities[i].cases<=twoThirdMaxCases){
            pointColor = "mm_20_orange.png";
        }
        //Red marker
        else if(data.cities[i].cases>twoThirdMaxCases && 
            data.cities[i].cases<maxCases){
            pointColor = "mm_20_red.png";
        }
        //Red marker
        else{
            pointColor = "mm_20_red.png";
        }
        //Draw marker inside the map
        var marker = new google.maps.Marker({
            position: coordinates,
            map: map,
            icon: {
                url: "http://labs.google.com/ridefinder/images/"+pointColor+""
            }
        });
    }
}