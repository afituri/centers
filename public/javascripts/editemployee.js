$(document).ready(function(){
  $.resul=new Array();
  /* disabled  editable*/
  var defaults = {
        disabled: true,
  };
  $.extend($.fn.editable.defaults, defaults);
  $('#enable').click(function() {
    $('#user .editable').editable('toggleDisabled');
  }); 
  $('body').on('click', '#radioBtn a', function () {
    var sel = $(this).data('title');
    var tog = $(this).data('toggle');
    var a=$(this).siblings("#p_type" );
    a.val(sel);
    $(this).siblings("a").removeClass('active').addClass('notActive');
    $(this).removeClass('notActive').addClass('active');
  })
  $.get('/employee/getCenters',function(result){
      for ( var i = 0 ; i< result.length; i++){
        var k = new Object({id : i,value : result[i].center_id, text : result[i].name});
        $.resul.push(k);
      }
    $('#center_idcenter').editable({
        url: '/employee/edit',
        source: $.resul,
        select2: {
          width: 200,
          placeholder: 'Select center',
          allowClear: false
        } 
    });      
  });
  $('a[id^="p_type"]').editable({
    url: '/users/edit',
    source:[
      {value:"المفوضية",text:"المفوضية"},
      {value:"شخصي",text:"شخصي"},
    ]
  });
  $('#employee_name').editable({
    url: '/employee/edit',
    type: 'text',
    pk: 1,
    name: 'employee_name',
    title: 'Enter employee name',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم الموظف';
    }
  });
  $('#nid').editable({
    url: '/employee/edit',
    type: 'text',
    pk: 1,
    name: 'nid',
    title: 'Enter  id ',
  });
  $('#account_number').editable({
    url: '/employee/edit',
    type: 'text',
    pk: 1,
    name: 'account_number ',
    title: 'Enter account number ',
  });
  $('#bank_name').editable({
    url: '/employee/edit',
    type: 'text',
    pk: 1,
    name: 'bank_name',
    title: 'Enter bank name',
  });
    $('#type_h').editable({
    url: '/employee/edit',
    source:[
      {value:0,text:"المدير العام"},
      {value:1,text:"مكتب المدير العام"},
      {value:2,text:"مكتب المتابعة الميدانية"},
      {value:3,text:"منسق امني"},
      {value:4,text:"المكتب القانوني"},
      {value:5,text:"ادارة البيانات"},
      {value:6,text:"التدريب"},
      {value:7,text:"تقنية المعلومات"},
      {value:8,text:"المرشحين"},
      {value:9,text:"الدعم اللوجستي"},
      {value:10,text:"التوعية والعلاقات العامة"},
      {value:11,text:"المراقبين"},
      {value:12,text:"الادارية"},
      {value:13,text:"المالية"},
      {value:14,text:"خدمات"},
      {value:15,text:"الاستعلامات"},
    ],
    pk: 1,
    name: 'type',
    validate: function(v) {
      if(!v) return 'الرجاء اختيار صفة الموظف';
    }
  });
  $('#type_e').editable({
    url: '/employee/edit',
    source:[
      {value:16,text:"رئيس اللجنة الانتخابية"},
      {value:17,text:"منسق العمليات"},
      {value:18,text:"منسق الشؤون الادارية والمالية"},
      {value:19,text:"منسق التوعية والعلاقات"},
      {value:20,text:"منسق امني"},
      {value:21,text:"المرشحين"},
      {value:22,text:"الدعم اللوجستي"},
      {value:23,text:"التوعية والعلاقات العامة"},
      {value:24,text:"المراقبين"},
      {value:25,text:"التدريب"},
      {value:26,text:"تقنية معلومات"},
      {value:27,text:"موظف مالية واداري"},
      {value:28,text:"مراجع مالي"},
      {value:29,text:"خدمات"},
      {value:30,text:"غفير"},
    ],
    pk: 1,
    name: 'type',
    validate: function(v) {
      if(!v) return 'الرجاء اختيار صفة الموظف';
    }
  });
  $("a[id^='phone_number']" ).editable({
    url: '/employee/edit',
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
  $('#email').editable({
    url: '/employee/edit',
    type: 'text',
    pk: 1,
    name: 'email',
    title: 'Enter email',
    success: function (res, newValue){
      return res.msg;
    }
  });
  $('#delete').click(function() {
    var id = $(this).val();
    $('#deleteemployee').val(id);
  });
  $('#deleteemployee').click(function() {
    var id = $(this).val();
    $.get('/employee/deleteemployee/'+id, function(result){
      window.location.href="/employee";
    });
  });
   $('body').on('click', '#deletePhone ', function () {
    var id = $(this).val();
    $('#confphone').val(id);
  }); 
  $('#confphone').click(function() {
    var id = $(this).val();
    $.get('/root/deletePhone/'+id, function(result){
      window.location.href="/employee/editemployee/"+$('#confphone').data("id");;
    });
  });
  $("#form").validate({
    rules: {
      'phone[]': {
        required: true,
        minlength: 10,
        number: true,
      }
    },
    messages: {
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