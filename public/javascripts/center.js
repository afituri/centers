$(document).ready(function(){
  $("a[id^='phone']").click(function() {
    var id = $(this).data("value");   
    $.get('/employee/getphone/'+id, function(result){
      $('#body').empty();
      for ( var i = 0; i < result.length;  i++ ) {
        $('#body').append("<tr><td>"+result[i].phone_number+"</td><td>"+result[i].type+"</td></tr>");
      }
    });
  });
  /* Go to employee needs view or edit */
  $("button[id^='viw']").click(function() {
    alert('id');
    var id = $(this).val();
    window.location.href="/employee/editemployee/"+id;
  });
  $("button[id^='delete']").click(function() {
    var id = $(this).val();
    $('#deleteemployee').val(id);
  });
  $('#deleteemployee').click(function() {
    var id = $(this).val();
    var center = $(this).data("center");
    $.get('/employee/deleteemployee/'+id, function(result){
      window.location.href="/center/"+center;
    });
  });
   $("#form").validate({
    rules: {
      subconstituency_idsubconstituency: {
        required: true,
      },
      center_idcenter: {
        required: true,
      },
      employee_name: {
        required: true,
      },
      email: {
        required: true,
        email: true,
        remote: {
          url :"/employee/checkEmail",
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
      employee_name: {
        required: "الرجاء ادخال اسم المستخدم",
      },
      email: {
        required: " هذا ليس بريد اليكتروني ",
        email: "هذا ليس بريد اليكتروني",
        remote: "هذا البريد الالكتروني تم تسجيله من قبل الرجاء اختيار بريد آخر"
      },
      subconstituency_idsubconstituency: {
        required: "الرجاء الاختيار ",
      },
      center_idcenter: {
        required: "الرجاء الاختيار ",
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
});
 

