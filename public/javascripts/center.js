$(document).ready(function(){
  $("[data-toggle=popover]").popover();
  $('#idcenter').on('input', function(){
    $.typet=new Array();
    if($('#idcenter').val().length >=3) {
      $.get('/center/searchEmpInCenter/'+$('#idcenter').val()+'/'+$('#deleteemployee').data('center'),function(result){
        $('#centers').empty();
        $('.pagination').hide();
        $.getJSON( "/employee/employee_type", function( json ) {
          for(key in json.hnec){
            $.typet.push(json.hnec[key]);
          }
          for(key in json.employee){
            $.typet.push(json.employee[key]);
          }
          for(key in result){
            var p = "";
            if (result[key].phone_number != null){
            p = result[key].phone_number ;
            }
            $('#centers').append('<tr><td >'+result[key].employee_name+'</td><td><a id="phone" href="#phonee" data-toggle="modal" onClick="pho('+result[key].idemployee+');"data-value="'+result[key].idemployee+
                                '">'+p+'</a></td><td>'+$.typet[result[key].type]+'</td><td width="12%"><a href="#" tabindex="0" id="'+result[key].idemployee+'" data-toggle="popover" data-trigger="hover" data-placement="top" title="اسم المركز" data-content="'+result[key].name+'">'+result[key].name+'</a>'+
                                '</td><td width="3%"><a class="btn btn-primary btn-xs"href="/employee/editemployee/'+result[key].idemployee+'">'+
                                '<span class="glyphicon glyphicon-eye-open"></span></a></td><td width="3%"><a class="btn btn-danger btn-xs"onClick="del('+result[key].idemployee+');" href="#del"data-toggle="modal"> <span class="glyphicon glyphicon-trash"></span></a> </td></tr>');
        }
          $("[data-toggle=popover]").popover();
      });
       });
    }
  });
  $('body').on('click', '#radioBtn a', function () {
    var sel = $(this).data('title');
    var tog = $(this).data('toggle');
    var a=$(this).siblings("#p_type" );
    a.val(sel);
    $(this).siblings("a").removeClass('active').addClass('notActive');
    $(this).removeClass('notActive').addClass('active');
  })

  $("a[id^='phone']").click(function() {
    var id = $(this).data("value");   
    $.get('/employee/getphone/'+id, function(result){
     $('#body').empty();
      $('#emaill').empty();
      $('#emaill').append("<tr><td><strong>البريد الالكتروني </strong></td><td>"+result[0].email+"</td></tr>");
      for ( var i = 0; i < result.length;  i++ ) {
        $('#body').append("<tr><td>"+result[i].phone_number+"</td><td>"+result[i].type+"</td><td>"+result[i].p_type+"</td></tr>");
      }
    });
  });
  /* Go to employee needs view or edit */
  $("button[id^='viw']").click(function() {
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
 