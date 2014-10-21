$(document).ready(function(){
  
  $.validator.addMethod("phoneNO", function(value, element) {
        return this.optional(element) || /[0-9]{10}/.test(value) ;
    });

    // validate signup form on keyup and submit
    $("#form").validate({
        
      rules: {
        
        username: {
          required: true,
          minlength: 5,
          
        },
        phone: {
          required: true,
          minlength: 10,
          phoneNO: true
        },
        email: {
          required: true,
          email :true
        },
        select:{
          required: true  
        }
      },
      messages: {
        username: {
          required: "الرجاء ادخال اسم المستخدم",
          minlength: "يجب أن يكون اسم المستخدم لا يقل عن 5 أحرف",  
        },
        phone: {
          required: "الرجاء ادخال رقم الهاتف",
          minlength: "يجب أن يكون الهاتف  لا يقل عن 10 ارقام",
          phoneNO:  "هذا ليس رقم هاتف"
        },
      email: {
        required: "الرجاء ادخال البريد الالكتروني",
        email :"هذا ليس بريد اليكتروني"
      },
      select:{
          required: "الرجاء الاختيار"
        }
        
      }
    });

});