$(document).ready(function(){
  $('#idcenter').on('input', function(){
    var type=["رئيس مركز","مدير محطة","محقق هوية","موزع أوراق الاقتراع","مراقب الصندوق","منظم الطابور بالمركز","منظم الطابور بالمحطة"];
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