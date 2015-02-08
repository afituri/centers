$(document).ready(function(){

  var defaults = {
        disabled: true,
  };

  $.extend($.fn.editable.defaults, defaults);
  $('body').on('click', '#enable', function () {
    $('#user .editable').editable('toggleDisabled');
  });

 

  $('#emp_office_name').editable({
    url: '#',
    type: 'text',
    pk: 1,
    name: 'emp_office_name',
    title: 'Enter center emp_office_name',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم الموظف';
    }
  });

  $('#email').editable({
    url: '#',
    type: 'text',
    pk: 1,
    name: 'email',
    title: 'Enter center email',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم الموظف';
    }
  });

  $('#nid').editable({
    url: '#',
    type: 'text',
    pk: 1,
    name: 'nid',
    title: 'Enter center nid',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم الموظف';
    }
  });

  $('#bank_name').editable({
    url: '#',
    type: 'text',
    pk: 1,
    name: 'bank_name',
    title: 'Enter center bank_name',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم الموظف';
    }
  });

  $('#acount_number').editable({
    url: '#',
    type: 'text',
    pk: 1,
    name: 'acount_number',
    title: 'Enter center acount_number',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم الموظف';
    }
  });


  $('#office_id').editable({
    url: '#',
    type: 'text',
    pk: 1,
    name: 'office_id',
    title: 'Enter center office_id',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم الموظف';
    }
  });

  $('#type').editable({
    url: '#',
    type: 'text',
    pk: 1,
    name: 'type',
    title: 'Enter center type',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم الموظف';
    }
  });

});