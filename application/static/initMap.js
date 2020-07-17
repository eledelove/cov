var map = "";
var coordinates = "";
function initMap(){
    
    //Map created from Southern California
    coordinates = {lat: 33.281943, lng: -116.6656103};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        streetViewControl: false,
	    fullscreenControl: true,
	    clickableIcons: false,
        keyboardShortcuts: false,
        center: coordinates
    });

    //Main region Southern California
    //coordinates that will be the vertices
    var verticesCoordinates = [            
        {lat: 35.251365, lng: -120.898685},
        {lat: 35.826938, lng: -115.670632},
        {lat: 34.261143, lng: -114.132649},
        {lat: 32.757126, lng: -114.526891},
        {lat: 32.718672, lng: -114.719719},
        {lat: 32.346217, lng: -119.824760}];        
 
 //The polygon is constructed (Southern California region)
   var polygonCalifornia = new google.maps.Polygon({
       paths: verticesCoordinates,
       strokeColor: '#FF0000',
       strokeOpacity: 0.5,
       strokeWeight: 3,
       fillOpacity: 0
     });
     polygonCalifornia.setMap(map);
    
    //Event to detect coordinates when the user clicks on a point
    google.maps.event.addListener(polygonCalifornia, 'click', function(event) { 
        var latitude = parseFloat(event.latLng.lat()); 
        var longitude = parseFloat(event.latLng.lng()); 
        //console.log(latitude + ', ' + longitude);
        //Variable to store latitude and longitude
        var latlng = {
            lat: parseFloat(latitude),
            lng: parseFloat(longitude)
        };
        //Create geocoder object
        var geocoder = new google.maps.Geocoder;
        //Get the address from latitude and longitude
            geocoder.geocode({
                'location': latlng
            }, function(results, status) {
                //If the request was successful
                if (status === google.maps.GeocoderStatus.OK) {
                    //If you found any results.
                    if (results[1]) {
                        getInformation(results, $("#date").val());
                    }
                }
            })
    });
     

}