$(document).ready(function(){
  $.validator.addMethod("loginRegex", function(value, element) {
        return this.optional(element) ||/\d/.test(value) && /[a-z]/i.test(value);
    });

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
        level:{
          required: true  
        },
        constit:{
          required: true  
        },
        name: {
          required: true,
          minlength: 5,
          
        },
        email: {
          required: true,
          minlength: 10,
          
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
        },
        phone: {
          required: true,
          minlength: 10,
          phoneNO: true
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
        },
        username: {
          required: "الرجاء ادخال اسم المستخدم",
          minlength: "يجب أن يكون اسم المستخدم لا يقل عن 5 أحرف",
          
        },
        name: {
          required: "الرجاء ادخال اسم المستخدم",
          minlength: "يجب أن يكون اسم المستخدم لا يقل عن 5 أحرف",
          
        },
        email: {
          required: "email error",
          minlength: "email error3",
          
        },
        level:{
          required: "الرجاء الاختيار"
        },
        constit:{
          required: "الرجاء الاختيار"
        },
        phone: {
          required: "phonenumber error",
          minlength: "phonenumber error3",
        }
        
      }
    });

});