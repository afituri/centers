$(document).ready(function(){
  $('#idcenter').on('input', function(){
    if($('#idcenter').val().length >=3) {
      $.get('/office/searchByCenterId/'+$('#idcenter').val(),function(result){
        $('#centers').empty();
        $('.pagination').hide();
        for(key in result){
          $('#centers').append('<tr><td>'+result[key].name+'</td><td>'+result[key].center_id+'</td></tr>');
        }
      });
    }
  });
});