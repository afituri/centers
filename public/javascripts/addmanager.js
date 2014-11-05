$(document).ready(function(){
  $.validator.addMethod("phoneNO", function(value, element) {
    return this.optional(element) || /[0-9]{10}/.test(value) ;
  });
  $.validator.addMethod("selectValidat", function (value) {
    return (value != '-1');
  });
  // validate signup form on keyup and submit
  
  $("#form").validate({
    rules: {
      name: {
        required: true
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
      constit:{
        selectValidat: true
      }
    },
    messages: {
      name: {
        required: "الرجاء ادخال اسم الموظف"
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
      constit:{
        selectValidat: "الرجاء الاختيار"
      } 
    }
  });

});