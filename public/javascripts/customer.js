$(document).ready(function(){
  $.validator.addMethod("loginRegex", function(value, element) {
        return this.optional(element) ||/\d/.test(value) && /[a-z]/i.test(value);
    });

  $.validator.addMethod("phoneNO", function(value, element) {
        return this.optional(element) || /[0-9]{10}/.test(value) ;
    });

  $.validator.addMethod("emailValidat", function(value) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value) ;
    });
   
  $.validator.addMethod("selectValidat", function (value) {
        return (value != '-1');
    });
  $.validator.addMethod("nameValidat", function(value) {
        return /^[A-Za-z]+$/.test(value) ;
    });

    //^[a-z0-9].*//^[A-Za-z]+$
    // validate signup form on keyup and submit
    $("#form").validate({
        
      rules: {
        
        username: {
          required: true,
          minlength: 5,
          
        },
        level:{
          selectValidat: true,
        },

        constit:{
          selectValidat: true,
        },
        name: {
          nameValidat: true,
          minlength: 5,
          
        },
        email: {
          emailValidat: true,
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
          nameValidat: "الرجاء ادخال اسم المستخدم  nameValidat",
          minlength: "يجب أن يكون اسم المستخدم لا يقل عن 5 أحرف",
          
        },
        email: {
          emailValidat: " email error emailValidat ",
          minlength: "email error3  minlength",
          
        },
        level:{
          selectValidat: "الرجاء الاختيار  level",
        },
        constit:{
          selectValidat: "الرجاء الاختيار  constit ",
        },
        phone: {
          required: "phonenumber error",
          minlength: "phonenumber error3",
        }
        
      }
    });

});