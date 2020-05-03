//Script to obtain information on the county and city selected from the map
function getInformation(results, date){

    //Get the city
    var city = results[0].address_components[2].long_name;
    //Get the county
    var county = results[0].address_components[3].long_name;
    county = county.replace("County", "");
    //Divide the date into day, month and year
    var auxiliaryDate = date.split("-");
    var day = auxiliaryDate[2];
    var mounth = auxiliaryDate[1];
    var year = auxiliaryDate[0];
    //All the parameters that will be sent for the request
    var parameters =
    {
        year: year,
        mounth: mounth,
        day: day,
        city: city
    }

    $.ajax({
    async: true, //Activate asynchronous transfer
    type: "POST", //The type of transaction for the data
    dataType: "json", //We will specify what data we will send
    contentType: "application/x-www-form-urlencoded", //We will specify the content type
    url: "script.py", //It will be the file that will process the AJAX request
    data: parameters, //Data that we are going to send you
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
    console.log(data);
}

function problems(textError, textStatus) {
    alert("Server problems: " + JSON.stringify(textError));
    alert("Server problems: " + JSON.stringify(textStatus));
}