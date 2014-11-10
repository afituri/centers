$(document).ready(function(){
  $("a[id^='phone']").click(function() {
    var id = $(this).data("value");
    var text;
    $.get('/employee/getphone/'+id, function(result){
      for ( var i = 0; i < result.length;  i++ ) {
        txet="<tr><td>"+result[i].phone_number+"</td><td>"+result[i].phone_number+"</td></tr>";
        $('#body').app

      }
     
    });
  });






});