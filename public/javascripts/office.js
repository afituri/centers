$(document).ready(function(){
  /* Go to user needs view or edit */
  $('body').on('click', '#view', function (){
    var id = $(this).val();
    window.location.href="http://localhost:3003/admin/editmanager/"+id;
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
      window.location.href="http://localhost:3003/admin";
    });
  });

 });

/*

$(document).ready(function(){
  $('body').on('click', '#office tbody tr', function () {
    var id = $(this).data("id");
    console.log(id);
  }); 
    $('body').on('click', '#viw ', function () {
    var id = $(this).val();
    window.location.href="http://localhost:3003/office/editoffice";
  }); 


  $('#offdelete').click(function() {
    var id = $(this).val();
    $.get('/deleteoffice/:id'+id, function(result){
      console.log("we get id ")
      window.location.href="http://localhost:3003/office";

    });

  });
});

*/
