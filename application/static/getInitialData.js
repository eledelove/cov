window.addEventListener('load', getInitialData);

//Script to obtain information on all counties and cities
function getInitialData(){
	
    $.ajax({
    async: true, //Activate asynchronous transfer
    type: "GET", //The type of transaction for the data
    dataType: "json", //We will specify what data we will send
    contentType: "application/x-www-form-urlencoded", //We will specify the content type
    url: "get_initial_data.py", //It will be the file that will process the AJAX request
    beforeSend: startSend, //Function that runs before the transaction begins
    success: arrival, //Function that is executed in case of success
    timeout: 4000,//Wait time
    error: problems //Function that runs if you have problems exceeding the timeout
    });
    return false;
}

function startSend() {
    console.log("Requesting information...");
}

function arrival(data){
    var date = paintMessage($("#date").val());
    console.log(date);
    if(data.cities[0].city=="No data"){
        alert("El servidor de base de datos no se ha actualizado a su fecha."+ 
        " Intente buscar por otra fecha y haga clic sobre el nombre de su "+ 
        "localidad");
    }
    else{
        //Function to draw markers
        paintPoints(map, data);
        //Get the date and day
        var date = paintMessage($("#date").val());
        //Get a table dynamically for county information
        paintTable(data, date);
    }
    //Send call script once the page is loaded
    var element = '<script type="text/javascript" src="/static/getInformation.js"></script>';
        $("body").append(element);
    
}

function problems(textError, textStatus) {
    alert("Server problems: " + JSON.stringify(textError));
    console.log(JSON.stringify(textError));
    alert("Server problems: " + JSON.stringify(textStatus));
}
