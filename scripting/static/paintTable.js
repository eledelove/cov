function paintTable(data, date){
    //Dynamically building the table
    var table = '<table class="table table-borderless table-hover table-dark">'+
                    '<thead>'+
                        '<tr>'+
                            '<td colspan="3">Statics by County up to date, '+date+'</td>'
                        '</tr>'+
                    '</thead>';
                for (var i = 0; i < data.counties.length; i++) {
                      table += '<tbody>'+
                                    '<tr align-text="center">'+
                                        '<td>'+data.counties[i].county+' County</td>'+
                                        '<td>'+data.counties[i].cases+' Cases</td>'+
                                        '<td>'+data.counties[i].deaths+' Deaths</td>'+
                                    '</tr>'+
                                '</tbody>';
                }
            
                    table += '</table>';
    //Adding table
    $("#table").append(table);
}