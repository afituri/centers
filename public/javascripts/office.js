$(document).ready(function(){
  $('body').on('click', '#office tbody tr', function () {
    var id = $(this).data("id");
    console.log(id);
  }); 
    $('body').on('click', '#viw ', function () {
    var id = $(this).val();
    window.location.href="http://localhost:3003/office/"+id;
  }); 


  $('#offdelete').click(function() {
    var id = $(this).val();
    $.get('/deleteoffice/:id'+id, function(result){
      console.log("we get id ")
      window.location.href="http://localhost:3003/office";

    });

  });
});