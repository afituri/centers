$(document).ready(function(){
  $('body').on('click', '#viw ', function () {
    var id = $(this).val();
    window.location.href="/root/edituser/"+id;
  }); 
  $('body').on('click', '#delete ', function () {
    var id = $(this).val();
    $('#confdelete').val(id);
  }); 
  $('#confdelete').click(function() {
  	var id = $(this).val();
  	$.get('/root/deleteUser/'+id, function(result){
      window.location.href="/root";
    });
  });
  $("a[id^='phone']").click(function() {
    var id = $(this).data("value");   
    $.get('/root/getphone/'+id, function(result){
      $('#body').empty();
      for ( var i = 0; i < result.length;  i++ ) {
        $('#body').append("<tr><td>"+result[i].phone_number+"</td><td>"+result[i].type+"</td></tr>");
      }
    });
  });
});