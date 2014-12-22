$(document).ready(function(){
  $('#idcenter').on('input', function(){
    if($('#idcenter').val().length >=3) {
      $.get('/admin/searchManager/'+$('#idcenter').val(),function(result){
        $('#centers').empty();
        $('.pagination').hide();
        
        for(key in result){
          var p = "";
          if (result[key].phone_number != null){
           p=result[key].phone_number ;
          }
          $('#centers').append('<tr><td>'+result[key].name+'</td><td>'+result[key].office_name_ar+'</td><td><a id="phone" href="#phonee" data-toggle="modal" onClick="pho('+result[key].iduser+');"data-value="'+result[key].iduser+
                                '">'+p+'</a></td><td><a class="btn btn-primary btn-xs"href="/admin/editmanager/'+result[key].iduser+'">'+
                                '<span class="glyphicon glyphicon-eye-open"></span></a></td><td><a class="btn btn-danger btn-xs"onClick="del('+result[key].iduser+');" href="#del"data-toggle="modal"> <span class="glyphicon glyphicon-trash"></span></a> </td></tr>');
        }
      });
    }
  });
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
      $('#emaill').empty();
      $('#emaill').append("<tr><td><strong>البريد الالكتروني </strong></td><td>"+result[0].email+"</td></tr>");
      for ( var i = 0; i < result.length;  i++ ) {
        $('#body').append("<tr><td>"+result[i].phone_number+"</td><td>"+result[i].type+"</td><td>"+result[i].p_type+"</td></tr>");
      } 
    });
  });
});