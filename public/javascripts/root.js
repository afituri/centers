$(document).ready(function(){
  $('body').on('click', '#viw ', function () {
    var id = $(this).val();
    window.location.href="http://localhost:3003/root/edituser/"+id;
  }); 
  $('body').on('click', '#delete ', function () {
    var id = $(this).val();
    $('#confdelete').val(id);
  }); 
  $('#confdelete').click(function() {
  	var id = $(this).val();
  	$.get('/root/deleteUser/'+id, function(result){
      window.location.href="http://localhost:3003/root";

    });

  });
});