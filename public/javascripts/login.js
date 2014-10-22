$(document).ready(function(){
  // validate signup form on keyup and submit
  $("#form").validate({    
    rules: {
      name: {
        required: true,
        minlength: 5,  
        },
        password: {
          required: true,
          minlength: 5,
        },
    },
    messages: {
      name: {
        required: "الرجاء ادخال اسم المستخدم",
        minlength: "يجب أن يكون اسم المستخدم لا يقل عن 5 أحرف",  
      },
      password: {
        required: "الرجاء ادخال كلمة المرور",
        minlength: "الرجاء ادخال كلمة المرور ﻻ تقل عن 5 احرف",  
      },    
    }
  });
});