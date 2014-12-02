$(document).ready(function(){
  $('#idcenter').on('input', function(){
    if($('#idcenter').val().length >=3) {
      $.get('/office/searchVillage/'+$('#idcenter').val(),function(result){
        $('#centers').empty();
        $('.pagination').hide();
        for(key in result){
          $('#centers').append('<tr><td>'+result[key].village_name+'</td></tr>');
        }
      });
    }
  });
});