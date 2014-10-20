$(document).ready(function(){
  $('body').on('click', '#admin tbody tr', function () {
    var id = $(this).data("id");
    console.log(id);
  }); 
});