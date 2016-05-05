$(document).ready(function(){

  // $.resul=new Array();

  /* disabled  editable *

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
  // phone radiobtn
  $('body').on('click', '#radioBtn a', function () {
    var sel = $(this).data('title');
    var tog = $(this).data('toggle');
    var a=$(this).siblings("#p_type" );
    a.val(sel);
    $(this).siblings("a").removeClass('active').addClass('notActive');
    $(this).removeClass('notActive').addClass('active');
  })
  //sex radiobtn

  $('body').on('click','#sex_radioBtn a', function () {
    var sel = $(this).data('title');
    var tog = $(this).data('toggle');
    var a= $(this).siblings("#sex");
    a.val(sel);
    $(this).siblings("a").removeClass('active').addClass('notActive');
    $(this).removeClass('notActive').addClass('active');
  })
  //social- radiobtn
  $('body').on('click', '#social_radioBtn a', function () {
    var sel = $(this).data('title');
    var tog = $(this).data('toggle');
    var a=$(this).siblings("#social_status" );
    a.val(sel);
    $(this).siblings("a").removeClass('active').addClass('notActive');
    $(this).removeClass('notActive').addClass('active');
  })  
  //work_type - radiobtn
  $('body').on('click', '#work_radioBtn a', function () {
    var sel = $(this).data('title');
    var tog = $(this).data('toggle');
    var a=$(this).siblings("#work_type" );
    a.val(sel);
    $(this).siblings("a").removeClass('active').addClass('notActive');
    $(this).removeClass('notActive').addClass('active');
  })
  
  //social- radiobtn
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
      $('#birthday').datetimepicker({
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 4,
        minView: 2,
        forceParse: 0,
        format: "yyyy-mm-dd",
        viewMode: "months", 
        minViewMode: "months"
      });
  $('#start_date').datetimepicker({
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 4,
        minView: 2,
        forceParse: 0,
        format: "yyyy-mm-dd",
        viewMode: "months", 
        minViewMode: "months"
      });

    $('#add_date').datetimepicker({
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 4,
        minView: 2,
        forceParse: 0,
        format: "yyyy-mm-dd",
        viewMode: "months", 
        minViewMode: "months"
      });
    $('#end_date').datetimepicker({
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 4,
        minView: 2,
        forceParse: 0,
        format: "yyyy-mm-dd",
        viewMode: "months", 
        minViewMode: "months"
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
        minlength:2,
      },
      emp_office_name: {
        required: true,
        minlength:2,
      },
      f_name: {
        required: true,
        minlength:2,
      },
      g_name: {
        required: true,
        minlength:2,
      },
      l_name: {
        required: true,
        minlength:2,
      },
      m_name: {
        required: true,
        minlength:10,
      },
      birthday: {
        required: true,
      },
      bank_name: {
        required: true,
      },
      nid: {
        required: true,
        number: true,
        minlength:12,
        maxlength:12,
      },
      acount_number: {
        required: true,
      },
      start_date:{
        required: true,
      },
      add_date:{
        required: true,
      },
      end_date:{
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
        required: "لم يتم اختيار الدائرة الفرعية الرجاء إعادة الدخول",
      },
      emp_office_name: {
        required: "الرجاء ادخال الأسم الأول",
        minlength: " يجب أن لا يكون الاسم يقل عن 2 ارقام ",
      },
      f_name: {
        required: "الرجاء إدخال إسم الأب",
        minlength: " يجب أن لا يكون الاسم يقل عن 2 ارقام ",
      },g_name: {
        required: "الرجاء ادخال إسم الجد",
        minlength: " يجب أن لا يكون الاسم يقل عن 2 ارقام ",
      },
      l_name: {
        required: "الرجاء ادخال اللقب",
        minlength: " يجب أن لا يكون الاسم يقل عن 2 ارقام ",
      },
      m_name: {
        required: "الرجاء ادخال إسم الأم ثلاثي",
        minlength: " يجب أن لا يكون الاسم يقل عن 10 ارقام ",
      },
      birthday: {
        required: "الرجاء إحتيار  الميلاد",
      },
      bank_name: {
        required: "الرجاء ادخال اسم المصرف",
      },
      nid: {
        required: "الرجاء إدخال الرقم الوطني",
        number: "الرجاء ادخال ارقام فقط ",
        minlength: " يجب أن  يكون الرقم يقل عن 12 رقم ",
        maxlength: " يجب أن  يكون الرقم ﻻيزيد عن 12 رقم ",
      },
      acount_number: {
        required: "الرجاء إدخال رقم الحساب",
      },
      start_date: {
        required: "الرجاء إختيار تاريخ العمل ",
      },
      add_date: {
        required: "الرجاء إختيار تاريخ الزيادة ",
      },
      end_date: {
        required: "الرجاء إختيار تاريخ إنتهاء العمل",
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
