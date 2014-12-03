$(document).ready(function(){
  /* Go to user needs view or edit */
  $('body').on('click', '#view', function (){
    var id = $(this).val();
    window.location.href="/admin/editmanager/"+id;
  });
  /* Go to user needs view or edit */
  $('body').on('click', '#delete ', function () {
    var id = $(this).val();
    $('#confdelete').val(id);
  });
  /* Go to user needs view or edit */ 
  $('#confdelete').click(function() {
    var id = $(this).val();
    $.get('/admin/deleteUser/'+id, function(result){
      window.location.href="/admin";
    });
  });
    $('body').on('click', '#phone ', function () {
    var id = $(this).data("value");
    $.get('/admin/getPhoneManager/'+id, function(result){
      $('#body').empty();
      for ( var i = 0; i < result.length;  i++ ) {
        $('#body').append("<tr><td>"+result[i].phone_number+"</td><td>"+result[i].type+"</td></tr>");
      } 
    });
  });
});