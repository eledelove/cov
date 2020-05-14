window.addEventListener('load', getInitialData);

//Script to obtain information on all counties and cities
function getInitialData(){
    //Divide the date into day, month and year
    var date=$("#date").val();
    var auxiliaryDate = date.split("-");
    var day = auxiliaryDate[2];
    var month = auxiliaryDate[1];
    var year = auxiliaryDate[0];
    //All the parameters that will be sent for the request
    var parameters =
    {
        year: year,
        month: month,
        day: day,

    }
	
    $.ajax({
    async: true, //Activate asynchronous transfer
    type: "POST", //The type of transaction for the data
    dataType: "json", //We will specify what data we will send
    contentType: "application/x-www-form-urlencoded", //We will specify the content type
    url: "get_initial_data.py", //It will be the file that will process the AJAX request
    data:parameters,
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
