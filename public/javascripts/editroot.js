$(document).ready(function(){
  var defaults = {
    disabled: true,
  };
  $.extend($.fn.editable.defaults, defaults);
  $('#enable').click(function() {
    $('#user .editable').editable('toggleDisabled');
  }); 
 
  
  $('#level').editable({
    url: '/users/edit',
    source:[
      {value:0,text:"root"},
      {value:1,text:"admin"},
      {value:2,text:"manager"}
    ]
  });
  $('#name').editable({
    url: '/users/edit',
    type: 'text',
    pk: 1,
    name: 'name',
    title: 'Enter username',
    toggleDisabled:'manul',
  });
  $('#phone').editable({
    url: '/users/edit',
    type: 'text',
    pk: 1,
    name: 'phone',
    title: 'Enter phone',
  });
  $('#email').editable({
    url: '/users/edit',
    type: 'text',
    pk: 1,
    name: 'email',
    title: 'Enter email',
  });
  $('#name').editable('option', 'validate', function(v) {
    if(!v) return 'الرجاء ادخال اسم المستخدم';
  });
  $('#phone').editable('option', 'validate', function(v) {
    var flag = /[0-9]{10}/.test(v);
    if(!v) return 'الرجاء ادخال رقم الهاتف';
    if(v.length<10) return "يجب أن يكون الهاتف  لا يقل عن 10 ارقام";
    if(!flag) return "هذا ليس رقم هاتف";
  });
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
    //alert("Data: " + data + "\nStatus: " + status);
    if(!data) alert("هذا البريد الالكتروني تم تسجيله من قبل الرجاء اختيار بريد آخر");
  });
  });
});