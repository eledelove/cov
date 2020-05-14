function paintTable(data, date){
    //Dynamically building the table
    var table = '<table class="table table-borderless table-hover table-dark">'+
                    '<thead>'+
                        '<tr>'+
                            '<td colspan="3" id="message">'+
                            'Estadísticas por condado actualizadas '+
                            'al día de hoy, '+date+'</td>'+
                        '</tr>'+
                    '</thead>';
                for (var i = 0; i < data.counties.length; i++) {
                      table += '<tbody>'+
                                    '<tr align-text="center">'+
                                        '<td>'+data.counties[i].county+'</td>'+
                                        '<td>'+data.counties[i].cases+' Casos</td>'+
                                        '<td>'+data.counties[i].deaths+' Muertes</td>'+
                                    '</tr>'+
                                '</tbody>';
                }
            
                    table += '</table>';
    //Adding table
    $("#table").append(table);
}