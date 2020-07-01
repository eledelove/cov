function paintTable(data, date){
    console.log(data);
    //sum total of cases
    var totalCases = 0;
    //sum total deaths
    var totalDeaths = 0;
    //auxiliary for numbers with commas
    var auxiliary = "";
    //Dynamically building the table
    var table = '<table class="table table-hover table-dark borderColor">'+
                    '<thead>'+
                        '<tr class="titlesColor">'+
                            '<td colspan="4">'+
                            'Estadísticas por condado</td>'+
                        '</tr>'+
                        '<tr class="titlesColor">'+
                            '<td>Condados</td>'+
                            '<td>Casos</td>'+
                            '<td>Muertes</td>'+
                            '<td>Última actualización</td>'+
                        '</tr>'+
                    '</thead>'+
                    '<tbody>';
                for (var i = 0; i < data.counties.length; i++) {
                      //format the date
                      var date =  data.counties[i].date.split("-");
                      date = date[1]+"/"+date[2]+"/"+date[0];
                      auxiliary = data.counties[i].cases.replace(",","");
                      totalCases += parseInt(auxiliary);
                      auxiliary = data.counties[i].deaths.replace(",","");
                      totalDeaths += parseInt(auxiliary);
                      table +=     '<tr align-text="center">'+
                                        '<td>'+data.counties[i].county+'</td>'+
                                        '<td>'+formatNumber.new(data.counties[i].cases)+'</td>'+
                                        '<td>'+formatNumber.new(data.counties[i].deaths)+'</td>'+
                                        '<td class="dateColor" id="date'+data.counties[i].county+'">'+date+'</td>'+
                                    '</tr>';
                }
                
                
                    table +=    '</tbody>'+
                                '<tfoot>'+
                                '<tr class="titlesColor">'+
                                    '<td></td>'+
                                    '<td>Total de casos: '+formatNumber.new(totalCases)+'</td>'+
                                    '<td>Total de muertes: '+formatNumber.new(totalDeaths)+'</td>'+
                                    '<td></td>'+
                                '</tr>'+
                                '</tfoot>'+
                                '</table>';
    //Adding table
    $("#table").append(table);
}