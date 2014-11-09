$(document).ready(function(){
  $.resul=new Array();
  /* disabled  editable*/
  var defaults = {
        disabled: true,
      };
  $.extend($.fn.editable.defaults, defaults);
  
  $('#enable').click(function() {
    $('#user.editable').editable('toggleDisabled');
  }); 
  
  $.get('/getCenters',function(result){
      for ( var i = 0 ; i< result.length; i++){
        var k = new Object({id : i,value : result[i].idcenter, text : result[i].name});
        $.resul.push(k);
      }
    $('#center_idcenter').editable({
        url: '/users/edit',
        source: $.resul,
        select2: {
            width: 200,
            placeholder: 'Select center',
            allowClear: false
        } 
    });      
  });
  
  $('#employee_name').editable({
    url: '/users/edit',
    type: 'text',
    pk: 1,
    name: 'employee_name',
    title: 'Enter employee name',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم الموظف';
    }
  });
  $('#email').editable({
    url: '/users/edit',
    type: 'text',
    pk: 1,
    name: 'email',
    title: 'Enter email',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال البريد الإلكتروني';
    }
  });
  $('#nid').editable({
    url: '/users/edit',
    type: 'text',
    pk: 1,
    name: 'nid',
    title: 'Enter  id ',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال الرقم الوطني';
    }
  });
  $('#account_number').editable({
    url: '/users/edit',
    type: 'text',
    pk: 1,
    name: 'account_number ',
    title: 'Enter account number ',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال رقم الحساب';
    }
  });
  $('#bank_name').editable({
    url: '/users/edit',
    type: 'text',
    pk: 1,
    name: 'bank_name',
    title: 'Enter bank name',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم البنك';
    }
  });
  
  $('#type').editable({
    url: '/users/edit',
    source:[
      {value:0,text:"رئيس مركز"},
      {value:1,text:"مدير محطة"},
      {value:2,text:"محقق هوية"},
      {value:3,text:"موزع أوراق الاقتراع"},
      {value:4,text:"مراقب الصندوق"},
      {value:5,text:"منظم الطابور بالمركز"},
      {value:6,text:"منظم الطابور بالمحطة"}
    ],
    pk: 1,
    name: 'type',
    validate: function(v) {
      if(!v) return 'الرجاء اختيار صفة الموظف';
    }
  });

  $('#center_idcenter').editable({
    url: '/users/edit',
    type: 'text',
    pk: 1,
    name: 'center_idcenter',
    title: 'Enter center name',
    validate: function(v) {
      if(!v) return 'الرجاء اختيار اسم المركز';
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
});