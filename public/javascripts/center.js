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


});