$(document).ready(function(){
  $('#office_idoffice').change(function() {
    var id =$(this).val();
    $.get('/office/getsub/'+id,function(result){
      var text = "";
      for (var i=0;i<result.length;i++)
      {  
         text += "<option value='"+result[i].idsubconstituency+"'>"+result[i].subconstituency_name+"</option>"; 

      }
      $("#subconstituency_idsubconstituency").append(text);

    });
  });
  $('#subconstituency_idsubconstituency').change(function() {
    var id =$(this).val();
    $.get('/office/getvillage/'+id,function(result){
      var text = "";
      for (var i=0;i<result.length;i++)
      {  
        console.log(result[i].village_name);
       text += "<option value='"+result[i].idvillage+"'>"+result[i].village_name+"</option>"; 

      }
      $("#village_idvillage").append(text);

    });
  });


  $(document).ready(function(){
  /* Go to user needs view or edit */
  $('body').on('click', '#view', function (){
    var id = $(this).val();
    window.location.href="http://localhost:3003/admin/editmanager/"+id;
  });
  /* Go to user needs view or edit */
  $('body').on('click', '#delete ', function () {
    var id = $(this).val();
    $('#confdelete').val(id);
  });
  /* Go to user needs view or edit */ 
  $('#confdelete').click(function() {
    var id = $(this).val();
    $.get('/admin/deleteUser/'+id, function(result){
      window.location.href="http://localhost:3003/admin";
    });
  });

 });


});