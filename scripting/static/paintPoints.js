function paintPoints(map, data) {
    
    var numberOfCities = data.cities.length;
    var maxCases = data.max_cases;
    var secondMaxCases = data.second_max_cases;
    var oneThirdMaxCases = Math.trunc(secondMaxCases/3);
    var twoThirdMaxCases = oneThirdMaxCases*2;

    for (var i = 0; i < numberOfCities; i++) {
        var pointColor = "";
        var coordinates =  {lat: parseFloat(data.cities[i].latitude), lng: parseFloat(data.cities[i].longitude)};
        
        if(data.cities[i].cases==0){
            pointColor = "mm_20_green.png";
        }
        else if(data.cities[i].cases>0 && data.cities[i].cases<=oneThirdMaxCases){
            pointColor = "mm_20_yellow.png";
        }
        else if(data.cities[i].cases>oneThirdMaxCases && data.cities[i].cases<=twoThirdMaxCases){
            pointColor = "mm_20_orange.png";
        }
        else if(data.cities[i].cases>twoThirdMaxCases && data.cities[i].cases<maxCases){
            pointColor = "mm_20_red.png";
        }
        else{
            pointColor = "mm_20_black.png";
        }
        var marker = new google.maps.Marker({
            position: coordinates,
            map: map,
            icon: {
                url: "http://labs.google.com/ridefinder/images/"+pointColor+""
            }
        });
    }
    console.log("Creando puntos");
}