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

 });