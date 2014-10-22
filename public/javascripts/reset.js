$(document).ready(function(){
  $.validator.addMethod("loginRegex", function(value, element) {
    return this.optional(element) ||/\d/.test(value) && /[a-z]/i.test(value);
  });
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
        required: "الرجاء إدخال كلمة المور",
        minlength: "يجب أن تكون كلمة المرور الخاصة بك على الأقل 5 أحرف",
        loginRegex: "يجب أن يحتوي اسم المستخدم فقط على أحرف أو أرقام ."
      },
      confirm_password: {
        required: "الرجاء إدخال كلمة المور",
        minlength: "يجب أن تكون كلمة المرور الخاصة بك على الأقل 5 أحرف",
        equalTo: "يرجى إدخال كلمة المرور نفسها على النحو الوارد أعلاه."
      }    
    }
  });

});