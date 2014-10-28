$(document).ready(function(){
  $('body').on('click', '#user tbody tr td  button', function (){
    var id = $(this).val();
    console.log(id);
    $.get('/admin/getManager/'+id, function(result){
      $("#name").val(result[0].name);
      $("#phone").val(result[0].phone);
      $("#email").val(result[0].email);
      $("#level").val(result[0].level);
  }); 
});
