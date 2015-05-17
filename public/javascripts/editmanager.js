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
  $.get('/admin/getoffice',function(result){
      for ( var i = 0 ; i< result.length; i++){
        var k = new Object({id : i,value : result[i].idoffice, text : result[i].office_name_ar});
        $.resul.push(k);
      }
    $('#office_idoffice').editable({
        url: '/users/edit',
        source: $.resul,
        select2: {
          width: 200,
          placeholder: 'Select country',
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
  $('#password').editable({
    url: '/users/editpass',
    type: 'text',
    pk: 1,
    name: 'password',
    title: 'Enter username',
    validate: function(v) {
      var flag = /[a-z]/.test(v)&& /\d/.test(v);
      if(!v) return 'الرجاء ادخال الرمز السري';
      if(v.length<8) return "طول كلمة المرور يجب ان لا تقل على 8 خانات";
      if(!flag) return "كلمة المرور يجب ان تتكون من حروف و ارقام";
    }
  });
  $('#name').editable({
    url: '/users/edit',
    type: 'text',
    pk: 1,
    name: 'name',
    title: 'Enter username',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم المستخدم';
    }
  });
  $("a[id^='phone_number']" ).editable({
    url: '/users/edit',
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
    url: '/users/edit',
    type: 'text',
    pk: 1,
    name: 'email',
    title: 'Enter email',
  });
  /* email valedation */
  $('#email').editable('option', 'validate', function(v) {
    if(!v) return 'الرجاء ادخال بريد اليكتروني';
    var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    var valid = emailReg.test(v);
    if(!valid) return 'هذا ليس بريد اليكتروني';
      $.post("/root/checkEmail2",
        {
          email:v,
        },
        function(data,status){
          if(!data) alert("هذا البريد الالكتروني تم تسجيله من قبل الرجاء اختيار بريد آخر");
      });
  });
  /* Go to user needs view or edit */
  $('body').on('click', '#delete ', function () {
    var id = $(this).val();
    $('#confdelete').val(id);
  });
  /* Go to user needs view or edit */ 
  $('#confdelete').click(function() {
    var id = $(this).val();
    $.get('/admin/deleteUser/'+id, function(result){
      window.location.href="/admin";
    });
  });
  $('body').on('click', '#deletePhone ', function () {
    var id = $(this).val();
    $('#confphone').val(id);
  }); 
  $('#confphone').click(function() {
    var id = $(this).val();
    $.get('/root/deletePhone/'+id, function(result){
      window.location.href="/admin/editmanager/"+$('#confphone').data("id");;
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