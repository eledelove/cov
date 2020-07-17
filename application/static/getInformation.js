//Script to obtain information on the county and city selected from the map
function getInformation(results, date){
    console.log(results);
    //Initializing without data
    var neighborhood = "Sin información";
    var city = "Sin información";
    var county = "Sin información";
    var address = "Sin información";
    for (var i= 0; i < results.length; i++) {
        //Get the neighborhood
        if(results[i].types[0]=="neighborhood"){
            neighborhood = results[i].address_components[0].long_name;
            neighborhood = neighborhood.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }
        //Get the locality
        else if(results[i].types[0]=="locality"){
            city = results[i].address_components[0].long_name;
            city = city.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }
        //Get the county
        else if(results[i].types[0]=="administrative_area_level_2"){
            county = results[i].address_components[0].long_name;
            county = county.replace("Condado de ", "");
            county = county.replace(" County", "");
            county = county.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }
        if(city=="Lompoc" || city=="Riverside" || city=="Blythe"){
            //Parse of places
            neighborhood = parsePlaces(results[0].address_components[1].long_name);
        }
        //Get the address
        address = results[0].address_components[0].long_name+" ";
        address += results[0].address_components[1].short_name+" ";
        address += results[0].address_components[3].long_name+" ";
        address += results[0].address_components[5].short_name+" ";
        address += results[0].address_components[7].long_name;

    }
    //Divide the date into day, month and year
    var id = "date"+county;
    date = document.getElementById(id).innerText;
    console.log(date);
    var auxiliaryDate = date.split("/");
    var day = auxiliaryDate[1];
    var month = auxiliaryDate[0];
    var year = auxiliaryDate[2];
    //All the parameters that will be sent for the request
    var parameters =
    {
        year: year,
        month: month,
        day: day,
        neighborhood: neighborhood,
        locality: city,
        city: county,
        address: address

    }
    console.log(parameters);
    $.ajax({
    async: true, //Activate asynchronous transfer
    type: "POST", //The type of transaction for the data
    dataType: "json", //We will specify what data we will send
    contentType: "application/x-www-form-urlencoded", //We will specify the content type
    url: "get_data.py", //It will be the file that will process the AJAX request
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
    //Is a place
    if(Object.keys(data).length==5){
        data.date = data.date.split("-");
        data.date = data.date[1]+"/"+data.date[2]+"/"+data.date[0];
        var table = "";
        //Dynamically building the table
        table = '<table class="table table-bordered table-hover">'+
                            '<thead class="encabezadoDomicilio">'+
                                '<tr>'+
                                    '<th colspan=2>Domicilio</th>'+
                                '</tr>'+
                            '</thead>'+
                            '<tbody class="cuerpoDomicilio">'+
                                '<tr>'+
                                    '<td>Dirección:</td>'+
                                    '<td>'+data.place+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td>Casos:</td>'+
                                    '<td>'+data.cases+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td>Muertes:</td>'+
                                    '<td>'+data.deaths+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td>Última actualización:</td>'+
                                    '<td>'+data.date+'</td>'+
                                '</tr>'+
                            '</tbody>'+
                        '</table>';
    }
    //Is a county, locality and neineighborhood
    else{
        if(data.deaths_neigh==0){
                data.deaths_neigh = "Sin información";
            }
            if(data.deaths_loca==0){
                data.deaths_loca = "Sin información";
            }
            var table = "";
            //Dynamically building the table
            table = '<table class="table table-bordered table-hover">'+
                                '<thead class="encabezadoTabla">'+
                                    '<tr>'+
                                        '<th colspan=2>Condado</th>'+
                                    '</tr>'+
                                '</thead>'+
                                '<tbody>'+
                                    '<tr class="cuerpoTabla">'+
                                        '<td>Nombre:</td>'+
                                        '<td>'+data.city+'</td>'+
                                    '</tr>'+
                                    '<tr class="cuerpoTabla">'+
                                        '<td>Casos:</td>'+
                                        '<td>'+data.cases+'</td>'+
                                    '</tr>'+
                                    '<tr class="cuerpoTabla">'+
                                        '<td>Muertes:</td>'+
                                        '<td>'+data.deaths+'</td>'+
                                    '</tr>'+
                                '</tbody>'+
                                '<thead class="encabezadoTabla">'+
                                    '<tr>'+
                                        '<th colspan=2>Localidad</th>'+
                                    '</tr>'+
                                '</thead>'+
                                '<tbody>'+
                                    '<tr class="cuerpoTabla">'+
                                        '<td>Nombre:</td>'+
                                        '<td>'+data.locality+'</td>'+
                                    '</tr>'+
                                    '<tr class="cuerpoTabla">'+
                                        '<td>Casos:</td>'+
                                        '<td>'+data.cases_loca+'</td>'+
                                    '</tr>'+
                                    '<tr class="cuerpoTabla">'+
                                        '<td>Muertes:</td>'+
                                        '<td>'+data.deaths_loca+'</td>'+
                                    '</tr>'+
                                '</tbody>'+
                                '<thead class="encabezadoTabla">'+
                                    '<tr>'+
                                        '<th colspan=2>Lugar o Vecindario</th>'+
                                    '</tr>'+
                                '</thead>'+
                                '<tbody>'+
                                    '<tr class="cuerpoTabla">'+
                                        '<td>Nombre:</td>'+
                                        '<td>'+data.neighborhood+'</td>'+
                                    '</tr>'+
                                    '<tr class="cuerpoTabla">'+
                                        '<td>Casos:</td>'+
                                        '<td>'+data.cases_neigh+'</td>'+
                                    '</tr>'+
                                    '<tr class="cuerpoTabla">'+
                                        '<td>Muertes:</td>'+
                                        '<td>'+data.deaths_neigh+'</td>'+
                                    '</tr>'+
                                '</tbody>'+
                            '</table>';
    }
    
        //Show information in a popup window           
        $("#information").empty();
        $("#information").append(table);
        $("#information").dialog(
            {
                dialogClass: "no-close",
                buttons: [
                  {
                    text: "Cerrar",
                    click: function() {
                      $( this ).dialog( "close" );
                    }
                  }
                ]
              }
        );
}

function problems(textError, textStatus) {
    alert("Server problems: " + JSON.stringify(textError));
    alert("Server problems: " + JSON.stringify(textStatus));
}
