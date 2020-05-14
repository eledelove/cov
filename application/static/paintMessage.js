function paintMessage(date){
      //Separate the date by day, month and year
      date = date.split("-");
      //Array of days
      var days=["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
      //Array of months
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      //Get day
      var day = date[2];
      //Get month
      var month = months[parseInt(date[1])-1];
      //Get year
      var year= date[0];
      //Get name of day
      var dt = new Date(day+' '+month+', '+year+' 12:00:00');
      //Get month in spanish
      month = meses[parseInt(date[1])-1];
      //Build message
      console.log(dt.getUTCDay());
      var result = days[dt.getUTCDay()]+' '+day+' de '+month+' de '+year;
      return result;
}