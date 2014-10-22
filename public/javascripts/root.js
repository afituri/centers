$(document).ready(function(){
  $('body').on('click', '#user tbody tr', function () {
    var id = $(this).data("id");
    console.log(id);
  }); 
});