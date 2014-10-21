$(document).ready(function(){
      $('#idshow').hide();
      $('#ids').change(function(){
        if($('#ids').val() == '2') {
          $('#idshow').show(); 
        } else {
            $('#idshow').hide(); 
        }  
    });


    $.validator.addMethod("loginRegex", function(value, element) {
          return this.optional(element) ||/\d/.test(value) && /[a-z]/i.test(value);
      });

      // validate signup form on keyup and submit
      $("#form").validate({
          
        rules: {

          email: {
            required: true,
            minlength: 5,
            
          }
        },
        messages: {
          
          email: {
            required: "email empty",
            minlength: "email non",
            loginRegex: "email Regex."
          },

        }
      });

});