$(document).ready(function(){

  // $.resul=new Array();

  /* disabled  editable */


 /* Go to emlpoyeeOffice needs view or edit */
 
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
  });  // 
  /* Go to employee needs view or edit */

  $('body').on('click', '#viw', function () {
    var ide = $(this).val();
    var oid = $(this).data('value');
    window.location.href="/office/editEmployeeOffice/"+oid+"/"+ide;
  });


  $('body').on('click', '#delete', function () {
    var id = $(this).val();
    $('#deleteemployee').val(id);
    $("#deleteemployee").attr('data-id',$(this).data("value"));
  });

  $('#deleteemployee').click(function() {
    var id = $(this).val();
    var center = $(this).data("id");
    $.get('/office/deleteemployee/'+id, function(result){
      window.location.href="/office/"+center+"/EmployeeOffice";
    });
  });
   $("#form").validate({
    rules: {
      subconstituency_idsubconstituency: {
        required: true,
      },
      emp_office_name: {
        required: true,
        minlength:5,
      },
      bank_name: {
        required: true,
      },
      nid: {
        required: true,
        number: true,
        minlength:12,
      },
      acount_number: {
        required: true,
      },
      'phone[]': {
        required: true,
        minlength: 10,
        number: true,
      }
    },
    messages: {
      subconstituency_idsubconstituency: {
        required: "الرجاء ادخال اسم المستخدم",
      },
      emp_office_name: {
        required: "الرجاء ادخال اسم المستخدم",
        minlength: " يجب أن لا يكون الاسم يقل عن 5 ارقام ",
      },
      bank_name: {
        required: "الرجاء ادخال اسم المصرف",
      },
      nid: {
        required: "الرجاء ادخال اسم المستخدم",
        number: "الرجاء ادخال ارقام فقط ",
        minlength: " يجب أن لا يكون الرقم يقل عن 12 رقم ",
      },
      acount_number: {
        required: "الرجاء ادخال اسم المستخدم",
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
