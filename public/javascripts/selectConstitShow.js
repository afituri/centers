$(document).ready(function(){
      $('#constit').hide();
      $('#level').change(function(){
        if($('#level').val() == '2') {
          $('#constit').show(); 
        } else {
            $('#constit').hide(); 
        }  
    });
});

