$(document).ready(function(){
  $('body').on('click', '#user tbody tr ', function () {
    var id = $(this).data("id");
    window.location.href="http://localhost:3003/root/editroot/"+id;
  }); 
});