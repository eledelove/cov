var map = "";
var coordinates = "";
function initMap(){
    
    //Map created from Caifornia
    coordinates = {lat: 37.2502200, lng: -119.7512600};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5.9,
        streetViewControl: false,
	    fullscreenControl: true,
	    clickableIcons: false,
        keyboardShortcuts: false,
        center: coordinates
    });

    //Main region California
    //coordinates that will be the vertices
    var verticesCoordinates = [            
        {lat: 32.166601, lng: -120.993069},
        {lat: 32.808349, lng: -114.216506},
        {lat: 34.749437, lng: -114.198813},
        {lat: 38.964515, lng: -119.949676},
        {lat: 41.993870, lng: -119.999479},
        {lat: 41.986555, lng: -125.132771}];        
 
 //The polygon is constructed (California region)
   var polygonCalifornia = new google.maps.Polygon({
       paths: verticesCoordinates,
       strokeColor: '#FF0000', //
       strokeOpacity: 0.5,
       strokeWeight: 3,
       //fillColor: '#FFFFFF', //
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
                        //console.log(results);
                        //saludo(results);
                        getInformation(results, $("#date").val());
                    }
                }
            })
    });
     

}