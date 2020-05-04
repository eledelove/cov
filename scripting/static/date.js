//Script to get the date when loading the page
//Date type object is created
var objectDate = new Date();
//Get day
if(objectDate.getDate()<10){
    var day = '0'+objectDate.getDate();
}
else{
    var day = objectDate.getDate();
}
//Get month 
if((objectDate.getMonth()+1)<10){
    var mounth = '0'+(objectDate.getMonth()+1);
}
else{
    var mounth = (objectDate.getMonth()+1);
}
//Get year
var year = objectDate.getFullYear();
//Save the date in format "yyyy-mm-dd"
var date = year+'-'+mounth+'-'+day;
//Assign the date in the input
$("#date").val(date);