$(document).ready(function(){
  $.resul=new Array();
  /*  */
  var defaults = {
        disabled: true,
      };
  $.extend($.fn.editable.defaults, defaults);
  $('#enable').click(function() {
    $('#user .editable').editable('toggleDisabled');
  }); 
  
  $.get('/office/getregion',function(result){
    for ( var i = 0 ; i< result.length; i++){
      var k = new Object({id : i,value : result[i].idoffice, text : result[i].region_name});
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
  $('#office_name_ar').editable({
    url: '/users/edit',
    type: 'text',
    pk: 1,
    name: 'office_name_ar',
    title: 'Enter office_name Arabic',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم المستخدم';
    }
  });
  $('#office_name').editable({
    url: '/users/edit',
    type: 'text',
    pk: 1,
    name: 'office_name',
    title: 'Enter office_name English',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم المستخدم';
    }
  });
  $('#office_id').editable({
    url: '/users/edit',
    type: 'text',
    pk: 1,
    name: 'office_id',
    title: 'Enter office_id',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم office_id';
    }
  });
  $('#region_name').editable({
    url: '/users/edit',
    type: 'text',
    pk: 1,
    name: 'region_name',
    title: 'Enter region_name',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال region_name';
    }
  });
});