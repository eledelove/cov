$(document).ready(function(){

    $("#getByDate").click(function(){
        //Divide the date into day, month and year
        var date = $("#date").val();
        console.log(date);
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
            url: "get_by_date.py", //It will be the file that will process the AJAX request
            data: parameters, //Data that we are going to send you
            beforeSend: startSend, //Function that runs before the transaction begins
            success: arrival, //Function that is executed in case of success
            timeout: 4000,//Wait time
            error: problems //Function that runs if you have problems exceeding the timeout
        });
        return false;
    });

    function startSend() {
        console.log("Requesting information...");
    }
    
    function arrival(data){
        console.log(data);
        if(data.counties[0].county=="No Data"){
            alert("No se encontraron resultados para la fecha seleccionada");
        }
        else{
            $("#map").empty();
            $("#table").empty();
            //Draw the map
            initMap();
            //Function to draw markers
            paintPoints(map, data);
            //Get a table dynamically for county information
            paintTable(data, date);
        }
        
    }
    
    function problems(textError, textStatus) {
        alert("Server problems: " + JSON.stringify(textError));
        alert("Server problems: " + JSON.stringify(textStatus));
    }
});