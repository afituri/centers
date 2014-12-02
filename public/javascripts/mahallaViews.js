$(document).ready(function(){
  $('#idcenter').on('input', function(){
    if($('#idcenter').val().length >=3) {
      $.get('/office/searchMahalla/'+$('#idcenter').val(),function(result){
        $('#centers').empty();
        $('.pagination').hide();
        for(key in result){
          $('#centers').append('<tr><td>'+result[key].mahalla_name+' </td></tr>');
        }
      });
    }
  });
});