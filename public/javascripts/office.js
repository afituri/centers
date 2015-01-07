$(document).ready(function(){

  $('body').on('click', '#delete ', function () {
    $('#confdelete').val(id);
  });
  /* Go to user needs view or edit */ 
  $('#confdelete').click(function() {
    var id = $(this).val();
    $.get('/admin/deleteUser/'+id, function(result){
      window.location.href="/admin";
    });
  });
  $('#idcenter').on('input', function(){
    if($('#idcenter').val().length >=3) {
      $.get('/office/searchByCenterId/'+$('#idcenter').val(),function(result){
        $('#centers').empty();
        $('.pagination').hide();
        for(key in result){
          $('#centers').append('<tr><td>'+result[key].center_id+'</td><td>'+result[key].name+'</td><td>'+result[key].center_type+
                                '</td><td><a class="btn btn-primary btn-xs"href="/center/'+result[key].center_id+'">'+
                                '<span class="glyphicon glyphicon-eye-open"></span></a></td></tr>');
        }
      });
    }
  });
});



