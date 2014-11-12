$(document).ready(function(){
  $.get('/employee/getoffice',function(result){
    $('#office_idoffice').empty();
    for ( var i = 0; i < result.length;  i++ ) {
      $('#office_idoffice').append("<option value = '"+result[i].office_id+"'>"+result[i].office_name+"</option>");
      }
  });

  $('#office_idoffice').change(function() {
    var id = $('#office_idoffice').val();
    $('#subconstituency_idsubconstituency').empty();
    $('#center_idcenter').empty();
    $.get('/employee/getsubconstituency/'+id,function(result){
      for ( var i = 0; i < result.length;  i++ ) {
        $('#subconstituency_idsubconstituency').append("<option value = '"+result[i].subconstituency_id+"'>"+result[i].subconstituency_name+"</option>");
      }
    });
  });
  $('#subconstituency_idsubconstituency').change(function() {
    var ido = $('#office_idoffice').val();
    var ids = $('#subconstituency_idsubconstituency').val();
    $('#center_idcenter').empty();
    $.get('/employee/getcenter/'+ido+"/"+ids,function(result){
      for ( var i = 0; i < result.length;  i++ ) {
        $('#center_idcenter').append("<option value = '"+result[i].center_id+"'>"+result[i].name+"</option>");
      }
    });
  });









});