$(document).ready(function(){

  /*  */
  var defaults = {
        disabled: true,
      };
  $.extend($.fn.editable.defaults, defaults);
  $('#enable').click(function() {
    $('#user .editable').editable('toggleDisabled');
  });

  $('#name').editable({
    url: '/users/edit',
    type: 'text',
    pk: 1,
    name: 'name',
    title: 'Enter username',
  });

  $('#center_id').editable({
    url: '/users/edit',
    type: 'text',
    pk: 1,
    name: 'phone',
    title: 'Enter phone',
  });
  
  $('#constituency').editable({
    url: '/users/edit',
    type: 'text',
    pk: 1,
    name: 'phone',
    title: 'Enter phone',
  });

  $('#subconstituency').editable({
    url: '/users/edit',
    type: 'text',
    pk: 1,
    name: 'phone',
    title: 'Enter phone',
  });

  $('#village').editable({
    url: '/users/edit',
    type: 'text',
    pk: 1,
    name: 'phone',
    title: 'Enter phone',
  });

  $('#mahalla').editable({
    url: '/users/edit',
    type: 'text',
    pk: 1,
    name: 'phone',
    title: 'Enter phone',
  });
  /*  */
  $('#name').editable('option', 'validate', function(v) {
    if(!v) return 'الرجاء ادخال اسم المستخدم';
  });
  /*  */
  $('#center_id').editable('option', 'validate', function(v) {
    var flag = /[0-9]{10}/.test(v);
    if(!v) return 'الرجاء ادخال رقم الهاتف';
    if(v.length<10) return "يجب أن يكون الهاتف  لا يقل عن 10 ارقام";
    if(!flag) return "هذا ليس رقم هاتف";
  });

});