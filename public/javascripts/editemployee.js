$(document).ready(function(){
  $.resul=new Array();
  /* disabled  editable*/
  // var defaults = {
  //       disabled: true,
  //     };
  // $.extend($.fn.editable.defaults, defaults);
  
  $('#enable').click(function() {
    $('#user.editable').editable('toggleDisabled');
  }); 
  
  $.get('/employee/getCenters',function(result){
      for ( var i = 0 ; i< result.length; i++){
        var k = new Object({id : i,value : result[i].idcenter, text : result[i].name});
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
  
  $('#type').editable({
    url: '/employee/edit',
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
});