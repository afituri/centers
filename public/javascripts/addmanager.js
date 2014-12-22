$(document).ready(function(){
  $.validator.addMethod("phoneNO", function(value, element) {
    return this.optional(element) || /[0-9]{10}/.test(value) ;
  });
  $.validator.addMethod("selectValidat", function (value) {
    return (value != '-1');
  });
  $('body').on('click', '#radioBtn a', function () {
    var sel = $(this).data('title');
    var tog = $(this).data('toggle');
    var a=$(this).siblings("#p_type" );
    a.val(sel);
    $(this).siblings("a").removeClass('active').addClass('notActive');
    $(this).removeClass('notActive').addClass('active');
  })
  // validate signup form on keyup and submit
  $("#form").validate({
    rules: {
      name: {
        required: true
      },
      'phone[]': {
        required: true,
        minlength: 10,
        number: true,
      },
      email: {
        required: true,
        email: true,
        remote: {
          url :"/users/checkEmail",
          type : "post",
          data: {
            email: function() {
              return $( "#email" ).val();
            }
          }
        }
      },
      constit:{
        selectValidat: true
      },
      office_idoffice:{
        selectValidat: true
      }
    },
    messages: {
      name: {
        required: "الرجاء ادخال اسم الموظف"
      },
      'phone[]': {
        required: "الرجاء ادخال رقم الهاتف",
        minlength: " يجب أن يكون الهاتف لا يقل عن 10 ارقام ",
        number: "الرجاء ادخال رقم الهاتف ",
      },
      email: {
        required: " هذا ليس بريد اليكتروني ",
        email: "هذا ليس بريد اليكتروني",
        remote: "هذا البريد الالكتروني تم تسجيله من قبل الرجاء اختيار بريد آخر"
      },
      constit:{
        selectValidat: "الرجاء الاختيار"
      },
      office_idoffice:{
        selectValidat: "الرجاء الاختيار"
      } 
    },
    errorPlacement: function(error, element) {
      if (element.attr("name") == "phone[]") {
          error.insertAfter("#phone_input");
      } else {
          error.insertAfter(element);
      }
    }
  });
});