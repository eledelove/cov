function paintTable(data){
    var table = '<table class="table table-borderless table-hover table-dark">'+
                    '<thead>'+
                        '<tr>'+
                            '<td colspan="3">Cases by County</td>'
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

    $("#table").append(table);
}