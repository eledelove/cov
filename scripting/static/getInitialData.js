window.addEventListener('load', getInitialData);

//Script to obtain information on all counties and cities
function getInitialData(){
    $.ajax({
    async: true, //Activate asynchronous transfer
    type: "POST", //The type of transaction for the data
    dataType: "json", //We will specify what data we will send
    contentType: "application/x-www-form-urlencoded", //We will specify the content type
    url: "get_initial_data", //It will be the file that will process the AJAX request
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
    console.log(JSON.stringify(textError));
    alert("Server problems: " + JSON.stringify(textStatus));
}