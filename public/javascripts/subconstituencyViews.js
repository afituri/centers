$(document).ready(function(){
  $('#idcenter').on('input', function(){
    if($('#idcenter').val().length >=3) {
      $.get('/office/searchSubconstituency/'+$('#idcenter').val(),function(result){
        $('#centers').empty();
        $('.pagination').hide();
        for(key in result){
          $('#centers').append('<tr><td>'+result[key].subconstituency_id+' </td><td>'+result[key].subconstituency_name+'</td><td>'+result[key].subconstituency_name_ar+'</td></tr>');
        }
      });
    }
  });
});