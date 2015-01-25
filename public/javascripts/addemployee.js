$(document).ready(function(){
	$.get('/employee/getoffice',function(result){
	$('#office_idoffice').empty();
	$('#office_idoffice').append("<option value = ''></option>");
		for ( var i = 0; i < result.length;  i++ ) {
			$('#office_idoffice').append("<option value = '"+result[i].office_id+"'>"+result[i].office_name_ar+"</option>");
		}
	});
	$('#office_idoffice').click(function() {
		$('#su').addClass('hidden');
		$('#ce').addClass('hidden');
		$('#ty').addClass('hidden');
		var id = $('#office_idoffice').val();
		if(id !=''){
		$('#su').removeClass('hidden');
		$('#subconstituency_idsubconstituency').empty();
		$('#center_idcenter').empty();
		$('#type').empty();
			$('#subconstituency_idsubconstituency').append("<option value = ''></option>");

		$.get('/employee/getsubconstituency/'+id,function(result){
			for ( var i = 0; i < result.length;  i++ ) {
				$('#subconstituency_idsubconstituency').append("<option value = '"+result[i].subconstituency_id+"'>"+result[i].subconstituency_name_ar+"</option>");
			}
		});
	}
	});
	$('#subconstituency_idsubconstituency').click(function() {
		var ido = $('#office_idoffice').val();
		var ids = $('#subconstituency_idsubconstituency').val();
		$('#ce').addClass('hidden');
		$('#ty').addClass('hidden');
		$('#center_idcenter').empty();
		$('#type').empty();
		if( ids!=''){
			$('#center_idcenter').append("<option value = ''></option>");
		$.get('/employee/getcenter/'+ido+"/"+ids,function(result){
			$('#ce').removeClass('hidden');
			for ( var i = 0; i < result.length;  i++ ) {
				$('#center_idcenter').append("<option value = '"+result[i].center_id+"'>"+result[i].name+"</option>");
			}
		});
	}
	});
	$('#center_idcenter').click(function() {
		var id = $('#center_idcenter').val();
		$('#ty').addClass('hidden');
		if(id !=''){
		$.getJSON( "employee/employee_type", function( json ) {
			$('#type').append("<option value = ''></option>");
			$('#ty').removeClass('hidden');
				if (id < 0)
					var type=json.hnec;
				else 
					var type = json.employee;
			  for(key in type){
			  	$('#type').append("<option value = '"+key+"'>"+type[key]+"</option>");
			  } 
		 });
	}
	});
	$("#form").validate({
		rules: {
			office_idoffice:{
				required: true,
			},
			type:{
				required: true,

			},
			subconstituency_idsubconstituency: {
				required: true,
			},
			center_idcenter: {
				required: true,
			},
			employee_name: {
				required: true,
			},
			email: {
				required: true,
				email: true,
				remote: {
					url :"/employee/checkEmail",
					type : "post",
					data: {
						email: function() {
							return $( "#email" ).val();
						}
					}
				}
			},
			'phone[]': {
				required: true,
				minlength: 10,
				number: true,
			}
		},
		messages: {
			employee_name: {
				required: "الرجاء ادخال اسم المستخدم",
			},
			email: {
				required: " هذا ليس بريد اليكتروني ",
				email: "هذا ليس بريد اليكتروني",
				remote: "هذا البريد الالكتروني تم تسجيله من قبل الرجاء اختيار بريد آخر"
			},
			subconstituency_idsubconstituency: {
				required: "الرجاء الاختيار ",
			},
			type:{
				required: "الرجاء الاختيار ",
			},
			office_idoffice: {
				required: "الرجاء الاختيار ",
			},
			center_idcenter: {
				required: "الرجاء الاختيار ",
			},
			'phone[]': {
				required: "الرجاء ادخال رقم الهاتف",
				minlength: " يجب أن يكون الهاتف لا يقل عن 10 ارقام ",
				number: "الرجاء ادخال رقم الهاتف ",
			}
		},
		errorPlacement: function(error, element) {
			if (element.attr("name") == "phone[]") {
					error.insertAfter("#phone_input");
			} else {
					error.insertAfter(element);
			}
		}
	});
});