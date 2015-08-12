$(document).ready(function(){
  $.resul=new Array();
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
      url: '/office/editEmployeeOfficeUpdate/',
      source:$.type_h,
      pk: 1,
      name: 'type',
      validate: function(v) {
        if(!v) return 'الرجاء اختيار صفة الموظف';
      }
  }); 
    

  });
  $.get('/office/getsuboffices/'+$('#office_id').data("value"),function(result){
      for ( var i = 0 ; i< result.length; i++){
        var k = new Object({id : i,value : result[i].subconstituency_name_ar, text : result[i].subconstituency_name_ar});
        $.resul.push(k);
      }
    $('#emp_subconstituency').editable({
        url: '/office/editEmployeeOfficeUpdate/',
        source: $.resul,
        select2: {
          width: 200,
          placeholder: 'Select center',
          allowClear: false
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
      if(v.length<2) return "يجب أن يكون الاسم أكثر من حرفان";
    }
  });

  $('#f_name').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    type: 'text',
    pk: 1,
    name: 'f_name',
    title: 'Enter center f_name',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم الموظف';
      if(v.length<2) return "يجب أن يكون الاسم أكثر من حرفان";
    }
  });

  $('#g_name').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    type: 'text',
    pk: 1,
    name: 'g_name',
    title: 'Enter center g_name',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم الموظف';
      if(v.length<2) return "يجب أن يكون الاسم أكثر من حرفان";
    }
  });

  $('#l_name').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    type: 'text',
    pk: 1,
    name: 'l_name',
    title: 'Enter center l_name',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم الموظف';
      if(v.length<2) return "يجب أن يكون الاسم أكثر من حرفان";
    }
  });

  $('#m_name').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    type: 'text',
    pk: 1,
    name: 'm_name',
    title: 'Enter center m_name',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم الموظف';
      if(v.length<10) return "الرجاء إدخال أسم الأم ثلاثي";
    }
  });

  $('#birthday').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    format: 'yyyy-mm-dd',    
        viewformat: 'yyyy-mm-dd',    
        datetimepicker: {
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
        },
    type: 'text',
    pk: 1,
    name: 'birthday',
    title: 'Enter your birthday',
    validate: function(v) {
      if(!v) return 'الرجاء إدخال تاريخ ميلادك';
    }
  });

  $('#email').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    type: 'text',
    pk: 1,
    name: 'email',
    title: 'Enter center email',
  });

  $('#sex').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    source:[
      {value:"1",text:"ذكر"},
      {value:"2",text:"أنثى"}],
    select2: {
      width: 200,
      placeholder: 'Select center',
      allowClear: false
    } 
  });

  $('#social_status').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    source:[
      {value:"1",text:"أعزب"},
      {value:"2",text:"متزوج"},
      {value:"3",text:"مطلقة"},
      {value:"4",text:"أرملة"}],
    select2: {
      width: 200,
      placeholder: 'Select center',
      allowClear: false
    } 
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

  $('#ID_number').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    type: 'text',
    pk: 1,
    name: 'ID_number',
    title: 'Enter center ID_number',
    validate: function(v) {
      var flag = /^[0-9\b]+$/.test(v);
      if(!v) return 'الرجاء ادخال رقم البطاقة الشخصية';
      if(v.length<6) return "يجب أن يكون رقم البطاقة الشخصية أكثر من 6 ارقام";
      if(!flag) return "هذا ليس رقم بطاقة شخصية";
    }
  });

  $('#pass_number').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    type: 'text',
    pk: 1,
    name: 'pass_number',
    title: 'Enter center pass_number',
    validate: function(v) {
      var flag = /^[0-9+a-z\b]+$/.test(v);
      if(!v) return 'الرجاء ادخال رقم جواز السفر';
      if(v.length<6) return "يجب أن يكون رقم جواز السفر 6 أرقام على الأقل";
      if(!flag)return "هذا ليس رقم جواز سفر";
    }
  });

  $('#address').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    type: 'text',
    pk: 1,
    name: 'address',
    title: 'Enter center address',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال العناون';
    }
  });

  $('#family_book_number').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    type: 'text',
    pk: 1,
    name: 'family_book_number',
    title: 'Enter center family_book_number',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال رقم كتيب العائلة';
    }
  });

  $('#family_page_number').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    type: 'text',
    pk: 1,
    name: 'family_page_number',
    title: 'Enter center family_page_number',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال رقم ورقة العائلة';
    }
  });

  $('#derestrict_number').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    type: 'text',
    pk: 1,
    name: 'derestrict_number',
    title: 'Enter center derestrict_number',
    validate: function(v) {
      if(!v) return 'الرجاء إدخال رقم القيد';
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
      if(!v) return 'الرجاء إدخال رقم الحساب';
    }
  });

  $('#start_date').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    format: 'yyyy-mm-dd',    
        viewformat: 'yyyy-mm-dd',    
        datetimepicker: {
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
        },
    type: 'text',
    pk: 1,
    name: 'start_date',
    title: 'enter start work date',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال تاريخ البداء';
    }
  });

  $('#end_date').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    format: 'yyyy-mm-dd',    
        viewformat: 'yyyy-mm-dd',    
        datetimepicker: {
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
        },
    type: 'text',
    pk: 1,
    name: 'end_date',
    title: 'Enter date end',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال تاريخ البداء';
    }
  });

  $('#qualification').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    type: 'text',
    pk: 1,
    name: 'qualification',
    title: 'Enter center graduation',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال المؤهل العلمي';
    }
  });

  $('#graduation').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    type: 'text',
    pk: 1,
    name: 'graduation',
    title: 'Enter center graduation',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال تاريخ التخرج';
    }
  });

  
  $('#work_type').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    source:[
      {value:"1",text:"ندب"},
      {value:"2",text:"عقد"}],
    select2: {
      width: 200,
      placeholder: 'Select center',
      allowClear: false
    } 
  });

  $('#level').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    type: 'text',
    pk: 1,
    name: 'level',
    title: 'Enter center level',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال الدرجة الوظيفية';
    }
  });

  $('#salary').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    type: 'text',
    pk: 1,
    name: 'salary',
    title: 'Enter center salary',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال قيمة المرتب';
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