$(document).ready(function(){

  $('#user .editable').editable('disable');
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
});