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
      level: {
        selectValidat: true,
      },
      constit: {
        selectValidat: true,
      },
      name: {
          required: true,
          minlength: 5,  
      },
      email: {
          required: true,
          email: true
      },
      phone: {
          required: true,
          minlength: 10,
          phoneNO: true,
      }
    },
    messages: {
      name: {
        required: "الرجاء ادخال اسم المستخدم",
        minlength: "يجب أن يكون اسم المستخدم لا يقل عن 5 أحرف",  
      },
      email: {
        required: " هذا ليس بريد اليكتروني ",
        email: "هذا ليس بريد اليكتروني",  
      },
      level: {
        selectValidat: "الرجاء الاختيار ",
      },
      constit: {
        selectValidat: "الرجاء الاختيار  ",
      },
      phone: {
        required: "الرجاء ادخال رقم الهاتف",
        minlength: " يجب أن يكون الهاتف  لا يقل عن 10 ارقام ",
      }  
    }
  });

  $(document).ready(function(){
    $('#constit').hide();
    $('#level').change(function() {
      if($('#level').val() == '2') {
        $('#constit').show(); 
      } else {
          $('#constit').hide(); 
        }  
    });
  });
});