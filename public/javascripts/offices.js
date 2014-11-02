$(document).ready(function(){
  $('body').on('click', '#constits tbody tr', function () {
    var id = $(this).data("id");
    console.log(id);
  }); 
});