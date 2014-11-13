$(document).ready(function(){
  $("a[id^='phone']").click(function() {
    var id = $(this).data("value");   
    $.get('/employee/getphone/'+id, function(result){
      $('#body').empty();
      for ( var i = 0; i < result.length;  i++ ) {
        $('#body').append("<tr><td>"+result[i].phone_number+"</td><td>"+result[i].type+"</td></tr>");
      }
    });
  });
  $("button[id^='delete']").click(function() {
    var id = $(this).val();
    $('#deleteemployee').val(id);
  });
  $('#deleteemployee').click(function() {
    var id = $(this).val();
    $.get('/employee/deleteemployee/'+id, function(result){
      window.location.href="/employee";
    });
  });
   /* Go to employee needs view or edit */
   $("button[id^='viw']").click(function() {
    var id = $(this).val();
    window.location.href="/employee/editemployee/"+id;
  });
});