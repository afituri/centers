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
      level: {
        selectValidat: true,
      },
      constit: {
        selectValidat: true,
      },
      name: {
       required: true,
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
      'phone[]': {
        required: true,
		    minlength: 10,
		    number: true,
      }
    },
    messages: {
      name: {
        required: "الرجاء ادخال اسم المستخدم",
      },
      email: {
        required: " هذا ليس بريد اليكتروني ",
        email: "هذا ليس بريد اليكتروني",
        remote: "هذا البريد الالكتروني تم تسجيله من قبل الرجاء اختيار بريد آخر"
      },
      level: {
        selectValidat: "الرجاء الاختيار ",
      },
      constit: {
        selectValidat: "الرجاء الاختيار ",
      },
      'phone[]': {
        required: "الرجاء ادخال رقم الهاتف",
        minlength: " يجب أن يكون الهاتف لا يقل عن 10 ارقام ",
        number: "الرجاء ادخال رقم الهاتف ",
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
    $('#constit').hide();
    $('#level').change(function() {
      if($('#level').val() == '2') {
        $('#constit').show();
      } else {
        $('#constit').hide();
      }
  });
});
