$(document).ready(function(){
  $("a[id^='phone']").click(function() {
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
    window.location.href="/admin/editemployee/"+id;
  }); 
});