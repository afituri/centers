$(document).ready(function(){
  $('body').on('click', '#phone ', function () {
    var id = $(this).data("value");
    $.get('/admin/getPhoneManager/'+id, function(result){
      $('#body').empty();
      for ( var i = 0; i < result.length;  i++ ) {
        $('#body').append("<tr><td>"+result[i].phone_number+"</td><td>"+result[i].type+"</td></tr>");
      } 
    });
  });
  
  $('body').on('click', '#viw ', function () {
    var id = $(this).val();
    window.location.href="/admin/editmanager/"+id;
  }); 
  
  $('#idcenter').on('input', function(){
    if($('#idcenter').val().length >=3) {
      $.get('/admin/searchManager/'+$('#idcenter').val(),function(result){
        $('#centers').empty();
        $('.pagination').hide();
        for(key in result){
          $('#centers').append('<tr><td>'+result[key].name+'</td><td>'+result[key].type+'</td><td><a id="phone" href="#phonee" data-toggle="modal" onClick="pho('+result[key].iduser+');"data-value="'+result[key].iduser+
                                '">'+result[key].phone_number+'</a></td><td><a class="btn btn-primary btn-xs"href="/admin/editmanager/'+result[key].iduser+'">'+
                                '<span class="glyphicon glyphicon-eye-open"></span></a></td>');
        }
      });
    }
  });
});