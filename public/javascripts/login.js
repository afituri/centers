$(document).ready(function(){
  // validate signup form on keyup and submit
  $("#form").validate({    
    rules: {
      username: {
        required: true,
      },
      password: {
        required: true,
        minlength: 5,
      },
    },
    messages: {
      username: {
        required: "الرجاء ادخال اسم المستخدم",
      },
      password: {
        required: "الرجاء ادخال كلمة المرور",
        minlength: "الرجاء ادخال كلمة المرور ﻻ تقل عن 5 احرف",  
      },    
    }
  });
});