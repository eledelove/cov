function paintMessage(date){
      //Separate the date by day, month and year
      date = date.split("-");
      //Array of days
      var days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      //Array of months
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      //Get day
      var day = date[2];
      //Get month
      var month = months[parseInt(date[1])-1];
      //Get year
      var year= date[0];
      //Get name of day
      var dt = new Date(day+' '+month+', '+year+' 12:00:00');
      //Build message
      var result = days[dt.getUTCDay()]+' '+month+' '+day+' '+year; 
      return result;
}