$(document).ready(function(){
  $.validator.addMethod("loginRegex", function(value, element) {
        return this.optional(element) ||/\d/.test(value) && /[a-z]/i.test(value);
    });

    // validate signup form on keyup and submit
    $("#form").validate({
        
      rules: {
        
        password: {
          required: true,
          minlength: 5,
          loginRegex: true
        },
        confirm_password: {
          required: true,
          minlength: 5,
          equalTo: "#password"
        }
        },
      messages: {
        
        password: {
          required: "Please provide a password",
          minlength: "Your password must be at least 5 characters long",
          loginRegex: "Username must contain only letters, numbers, or dashes."
        },
        confirm_password: {
          required: "Please provide a password",
          minlength: "Your password must be at least 5 characters long",
          equalTo: "Please enter the same password as above"
        }
        
      }
    });
  //$("#password" ).change(function() {
       // var val=$("#password").val();
    //var result =  val.length >= 6 && /\d/.test(val) && /[a-z]/i.test(val);
    //if (!result) {
    //  $("#password" ).val("")  ;
      //  alert(val);
    //}
    
  
 // });
});