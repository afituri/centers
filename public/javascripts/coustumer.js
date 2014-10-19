$(document).ready(function(){
  $.validator.addMethod("loginRegex", function(value, element) {
        return this.optional(element) ||/\d/.test(value) && /[a-z]/i.test(value);
    });

    // validate signup form on keyup and submit
    $("#form").validate({
        
      rules: {
        
        username: {
          required: true,
          minlength: 5,
          
        },
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
        },
        username: {
          required: "Please provide a username",
          minlength: "Your username must be at least 5 characters long",
          
        }
        
      }
    });

});