$(document).ready(function(){
  $.resul=new Array();
  $.type_h=new Array();
  $.type_e=new Array();
  /* disabled  editable*/
  var defaults = {
        disabled: true,
  };
  $.getJSON("/employee/employee_type", function( json ) {
    var type=json.hnec;
    var type = json.employee;
    var i = 0;
    for(key in json.hnec){
      var k = new Object({id : i,value : key, text : json.hnec[key]});
      i++;
      $.type_h.push(k);

    }
    var i = 0;
    for(key in json.employee){
      var k = new Object({id : i,value : key, text : json.employee[key]});
      i++;
      $.type_e.push(k);

    }  
    $('#type_h').editable({
        url: '/employee/edit',
        source:$.type_h,
        pk: 1,
        name: 'type',
        validate: function(v) {
          if(!v) return 'الرجاء اختيار صفة الموظف';
        }
    }); 
    $('#type_e').editable({
    url: '/employee/edit',
    source:$.type_e,
    pk: 1,
    name: 'type',
    validate: function(v) {
      if(!v) return 'الرجاء اختيار صفة الموظف';
    }
  });    
  });
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