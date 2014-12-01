$(document).ready(function(){
  $('#idcenter').on('input', function(){
    var type=["رئيس مركز","مدير محطة","محقق هوية","موزع أوراق الاقتراع","مراقب الصندوق","منظم الطابور بالمركز","منظم الطابور بالمحطة"];
    if($('#idcenter').val().length >=3) {
      $.get('/employee/searchEmployee/'+$('#idcenter').val(),function(result){
        $('#centers').empty();
        $('.pagination').hide();
        for(key in result){
          $('#centers').append('<tr><td>'+result[key].employee_name+'</td><td>'+result[key].email+'</td><td><a id="phone" href="#phonee" data-toggle="modal" onClick="pho('+result[key].idemployee+');"data-value="'+result[key].idemployee+
                                '">'+result[key].phone_number+'</a></td><td>'+type[result[key].type]+'</td><td>'+result[key].name+'</td><td><a class="btn btn-primary btn-xs"href="/employee/editemployee/'+result[key].idemployee+'">'+
                                '<span class="glyphicon glyphicon-eye-open"></span></a></td><td><a class="btn btn-danger btn-xs" href="#del"data-toggle="modal"> <span class="glyphicon glyphicon-trash"></span></a> </td></tr>');
        }
      });
    }
  });
  // $("a[id^='phone']").click(function() {
  //   var id = $(this).data("value");   
  //   $.get('/employee/getphone/'+id, function(result){
  //     $('#body').empty();
  //     for ( var i = 0; i < result.length;  i++ ) {
  //       $('#body').append("<tr><td>"+result[i].phone_number+"</td><td>"+result[i].type+"</td></tr>");
  //     }
  //   });
  // });
  // $("button[id^='delete']").click(function() {
  //   var id = $(this).val();
  //   $('#deleteemployee').val(id);
  // });
  // $('#deleteemployee').click(function() {
  //   var id = $(this).val();
  //   $.get('/employee/deleteemployee/'+id, function(result){
  //     window.location.href="/employee";
  //   });
  // });
   /* Go to employee needs view or edit */
   $("button[id^='viw']").click(function() {
    var id = $(this).val();
    window.location.href="/employee/editemployee/"+id;
  });
});