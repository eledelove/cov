function paintMessage(date){
    console.log(date);

    // var fecha = $("#fecha").val();
    //   fecha = fecha.split("/");
      date = date.split("-");
      var days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var day = date[2];
      var month = months[parseInt(date[1])-1];
      var year= date[0];
      var dt = new Date(day+' '+month+', '+year+' 12:00:00');
      $("#message").append('<h3>The information in the table is for today, '+days[dt.getUTCDay()]+' '+month+' '+day+' '+year+'</h3>');
      console.log("Día "+days[dt.getUTCDay()]);
      //document.getElementById('fechaDeCargas').innerHTML = "Reporte de Cobranza "+dias[dt.getUTCDay()]+" "+dia+" de "+meses[mesEspanol]+" "+anio+" "+datos[0];
      
      
      
}