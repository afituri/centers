$(document).ready(function(){

  $('#level').editable({
    source:[
      {value:0,text:"root"},
      {value:1,text:"admin"},
      {value:2,text:"manager"}
    ]
  });

  $('#name').editable({
    url: '/post',
    type: 'text',
    pk: 'iduser',
    name: 'name',
    title: 'Enter username',
   // value: '$("#name").val()'
  });

  $('#phone').editable({
    url: '/post',
    type: 'text',
    pk: 'phone',
    name: 'phone',
    title: 'Enter phone',
   // value: '$("#phone").val()'
  });

  $('#email').editable({
    url: '/post',
    type: 'text',
    pk: 1,
    name: 'email',
    title: 'Enter email',
  //  value: '$("#email").val()'
  });
});