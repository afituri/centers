$(document).ready(function(){

  /* Go to user needs view or edit */
  $("button[id^='view']").click(function() {
    var id = $(this).val();
    window.location.href="/office/center/"+id;
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
      window.location.href="/admin";
    });
  });

  $('#idcenter').on('input', function(){
    if($('#idcenter').val().length >=3) {
      $.get('/office/searchByCenterId/'+$('#idcenter').val(),function(result){
        $('#centers').empty();
        for(key in result){
          $('#centers').append('<tr><td>'+result[key].center_id+'</td><td>'+result[key].name+'</td><td>'+result[key].center_type+
                                '</td><td><button id="delete" class="btn btn-danger btn-xs" href="#del" data-toggle="modal"'+
                                ' value="#{'+result[key].center_id+'}" ><span class="glyphicon glyphicon-trash"></span></button></td></tr>');
        }
      });
    }
  });
});


  /*typeahead search*/
  // var substringMatcher = function(strs) {
  //   return function findMatches(q, cb) {
  //     var matches, substrRegex;
   
  //     // an array that will be populated with substring matches
  //     matches = [];
   
  //     // regex used to determine if a string contains the substring `q`
  //     substrRegex = new RegExp(q, 'i');
   
  //     // iterate through the pool of strings and for any string that
  //     // contains the substring `q`, add it to the `matches` array
  //     $.each(strs, function(i, str) {
  //       if (substrRegex.test(str)) {
  //         // the typeahead jQuery plugin expects suggestions to a
  //         // JavaScript object, refer to typeahead docs for more info
  //         matches.push({ value: str });
  //       }
  //     });
   
  //     cb(matches);
  //   };
  // };
 

 //  function getStates(){
 //    console.log($('#idcenter').val());
 //    if($('#idcenter').val()){
 //      $.get('/office/searchByCenterId/'+$('#idcenter').val(),function(result){
 //        $.centers = result;
 //        console.log($.centers);
 //      });
 //    }
 //    $.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
 //      'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
 //      'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
 //      'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
 //    ];
 //    return $.centers;
 //  }
   
 //  $('#searchcenter .typeahead').typeahead({
 //    hint: true,
 //    highlight: true,
 //    minLength: 1
 //  },
 //  {
 //    name: 'states',
 //    displayKey: 'center_id',
 //    source: substringMatcher(getStates())
 //  });

 // });

/*

$(document).ready(function(){
  $('body').on('click', '#office tbody tr', function () {
    var id = $(this).data("id");
    console.log(id);
  }); 
    $('body').on('click', '#viw ', function () {
    var id = $(this).val();
    window.location.href="http://localhost:3003/office/editoffice";
  }); 


  $('#offdelete').click(function() {
    var id = $(this).val();
    $.get('/deleteoffice/:id'+id, function(result){
      console.log("we get id ")
      window.location.href="http://localhost:3003/office";

    });

  });
});

*/
