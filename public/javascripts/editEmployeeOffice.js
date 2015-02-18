$(document).ready(function(){

  $.type_h=new Array();

  var defaults = {
    disabled: true,
  };

  $('body').on('click', '#radioBtn a', function () {
    var sel = $(this).data('title');
    var tog = $(this).data('toggle');
    var a=$(this).siblings("#p_type" );
    a.val(sel);
    $(this).siblings("a").removeClass('active').addClass('notActive');
    $(this).removeClass('notActive').addClass('active');
  })

  $.extend($.fn.editable.defaults, defaults);
  $('body').on('click', '#enable', function () {
    $('#user .editable').editable('toggleDisabled');
  });

  $.getJSON("/employee/employee_type", function( json ) {
    var type=json.hnec;
    var i = 0;
    for(key in json.hnec){
      var k = new Object({id : i,value : key, text : json.hnec[key]});
      i++;
      $.type_h.push(k);
    }
      
    $('#type').editable({
        url: '',
        source:$.type_h,
        pk: 1,
        name: 'type',
        validate: function(v) {
          if(!v) return 'الرجاء اختيار صفة الموظف';
        }
    }); 
       
  });

  $('body').on('click', '#deletePhone ', function () {
    var id = $(this).val();
    $('#confphone').val(id);
  }); 
  $('#confphone').click(function() {
    var id = $(this).val();
    var idEmp = $(this).data("id");
    $.get('/root/deletePhone/'+id, function(result){
      window.location.href="/office/editEmployeeOffice/"+idEmp;
    });
  });

  $('a[id^="p_type"]').editable({
    url: '/office/editEmpOfficeTypePhone/',
    source:[
      {value:"المفوضية",text:"المفوضية"},
      {value:"شخصي",text:"شخصي"},
    ]
  });
  
  $("a[id^='phone_number']" ).editable({
    url: '/office/editEmpOfficeTypePhone/',
    type: 'text',
    pk: 1,
    name: 'phone_number',
    title: 'Enter phone',
    validate: function(v) { 
      var flag = /^[0-9\b]+$/.test(v);
      if(!v) return 'الرجاء ادخال رقم الهاتف';
      if(v.length<10) return "يجب أن يكون الهاتف  لا يقل عن 10 ارقام";
      if(!flag) return "هذا ليس رقم هاتف";
    }
  });
  
  $('#emp_office_name').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    type: 'text',
    pk: 1,
    name: 'emp_office_name',
    title: 'Enter center emp_office_name',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم الموظف';
      if(v.length<5) return "يجب أن يكون الاسم أكثر من 5 حروف";
    }
  });

  $('#email').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    type: 'text',
    pk: 1,
    name: 'email',
    title: 'Enter center email',
  });

  $('#nid').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    type: 'text',
    pk: 1,
    name: 'nid',
    title: 'Enter center nid',
    validate: function(v) {
      var flag = /^[0-9\b]+$/.test(v);
      if(!v) return 'الرجاء ادخال الرقم الوطني';
      if(v.length<12) return "يجب أن يكون الرقم الوطني أكثر من 12 رقم";
      if(!flag) return "هذا ليس رقم وطني";
    }
  });

  $('#bank_name').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    type: 'text',
    pk: 1,
    name: 'bank_name',
    title: 'Enter center bank_name',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم المصرف';
    }
  });

  $('#acount_number').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    type: 'text',
    pk: 1,
    name: 'acount_number',
    title: 'Enter center acount_number',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال رقم الحساب';
      if(v.length<4) return "يجب أن يكون رقم الحساب أكثر من 4 رقم";
    }
  });

  $('#deleteemployee').click(function() {
    var id = $(this).val();
    var center = $(this).data("value");
    $.get('/office/deleteemployee/'+id, function(result){
      window.location.href="/office/"+center+"/EmployeeOffice";
    });
  });

  /* email valedation */
  $('#email').editable('option', 'validate', function(v) {
    if(!v) return 'الرجاء ادخال البريد الالكتروني';
    var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    var valid = emailReg.test(v);
    if(!valid) return 'هذا ليس البريد الالكتروني';
      $.post("/office/employeeoffice/checkEmail",
        {
          email:v,
        },
        function(data,status){
          if(!data) alert("هذا البريد الالكتروني تم تسجيله من قبل الرجاء اختيار بريد آخر");
      });
  });

});