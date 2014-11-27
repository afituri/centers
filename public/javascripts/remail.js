$(document).ready(function(){
  $("#form").validate({
    rules: {
      email: {
        required: true,
        minlength: 10
      }
    },
    messages: {
      email: {
        required: " هذا ليس بريد اليكتروني ",
        minlength: "هذا ليس بريد اليكتروني"
      }        
    }
  });
});