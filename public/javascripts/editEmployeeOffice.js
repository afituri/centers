$(document).ready(function(){

  $.type_h=new Array();

  var defaults = {
    disabled: true,
  };

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

  $.extend($.fn.editable.defaults, defaults);
  $('body').on('click', '#enable', function () {
    $('#user .editable').editable('toggleDisabled');
  });

  $('#emp_office_name').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    type: 'text',
    pk: 1,
    name: 'emp_office_name',
    title: 'Enter center emp_office_name',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم الموظف';
    }
  });

  $('#email').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    type: 'text',
    pk: 1,
    name: 'email',
    title: 'Enter center email',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم الموظف';
    }
  });

  $('#nid').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    type: 'text',
    pk: 1,
    name: 'nid',
    title: 'Enter center nid',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم الموظف';
    }
  });

  $('#bank_name').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    type: 'text',
    pk: 1,
    name: 'bank_name',
    title: 'Enter center bank_name',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم الموظف';
    }
  });

  $('#acount_number').editable({
    url: '/office/editEmployeeOfficeUpdate/',
    type: 'text',
    pk: 1,
    name: 'acount_number',
    title: 'Enter center acount_number',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم الموظف';
    }
  });

  $('#deleteemployee').click(function() {
    var id = $(this).val();
    var center = $(this).data("value");
    $.get('/office/deleteemployee/'+id, function(result){
      window.location.href="/office/"+center+"/EmployeeOffice";
    });
  });

});