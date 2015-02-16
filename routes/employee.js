var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var userMgr = require('../app/user').userMgr;
var centerMgr = require('../app/center').centerMgr;
var logMgr = require('../app/log').repoMgr;
var employeeMgr = require('../app/employee').employeeMgr;
var phoneMgr = require('../app/phone').phoneMgr;
var officeMgr = require('../app/office').officeMgr;
var subconstituencyMgr = require('../app/subconstituency').subconstituencyMgr;
var Step = require('step');
var employee_type = require('../employee_type.json');
var employees =[];

/* GET home page. */
router.get('/',userHelpers.isAdmin, function(req, res) {
  req.session.back = req.originalUrl;
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  employeeMgr.getemployees(limit,req.session.iduser,req.session.level,req.session.office_idoffice,function(results){
    if(results[1][0] != undefined){
      var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
      var pagination = userHelpers.paginate(page,pageCount);
      res.render('employee',{title: 'الموظفين',name:req.session.name,employees:results[0], pagination : pagination,level:req.session.level,employee_type:employee_type});
    } else {
      res.render('employee',{title: 'الموظفين',name:req.session.name,employees:employees, pagination : null,level:req.session.level,employee_type:employee_type});      
    }
  });
});

/* GET editemployee page. */
router.get('/editemployee/:id',userHelpers.isAcsees, function(req, res) {
  employeeMgr.getemployee(req.params.id,function(result){
    URL = req.session.back;
    console.log(result);
    res.render('editemployee', { title: "تعديل الموظفين", employee : result[0],phone : result[1] , url : URL});
  });
});

/* GET centers. */
router.get('/getCenters', function(req, res) {
  centerMgr.getCentersSelect(function(result){
    res.send(result);
  })
});
/* add employee. */
router.post('/addemployee', function(req, res) {
  employeeMgr.addemployee(req.body, function (results){
    logMgr.insertLog(req.session.iduser,"add","employee"," add new employee name : "+results.name,results.id,results.name);
    res.redirect('/employee');
  });
});
/* employee type  */
router.get('/employee_type', function(req, res) {
  res.send(employee_type);
});
/* searchByname employee  */
router.get('/searchEmployee/:id', function(req, res) {
  employeeMgr.searchEmployee(req.params.id,req.session.level,req.session.office_idoffice,function(result){
    res.send(result);
  })
});
/* add employee. center */
router.post('/addemployeeCenter/:id', function(req, res) {
  employeeMgr.addemployee(req.body, function (results){
    logMgr.insertLog(req.session.iduser,"add","employee"," add new employee name : "+results.name,results.id,results.name);
    res.redirect('/center/'+req.params.id);
  });
});
/* GET employee phones. */
router.get('/getphone/:id', function(req, res) {
  phoneMgr.getphone(req.params.id,function(result){
    res.send(result);
  })
});
/* delete employee */
router.get('/deleteemployee/:id', function(req, res) {
  employeeMgr.deleteemployee(req.params.id,function(result,resultz){
    logMgr.insertLog(req.session.iduser,"delete","employee"," delete employee ",req.params.id,resultz[0].employee_name);
    for(key in result){
      logMgr.insertLog(req.session.iduser,"delete","phone","delete phones employee",result[key].idphone,result[key].phone_number);
    }
    res.send(result);
  })
});
/* get offise  . */
router.get('/getoffice', function(req, res) {
  officeMgr.getOfficeManager(req.session.level,req.session.office_idoffice,function(result){
    res.send(result);
  })
});
/* get subconstituency  . */
router.get('/getsubconstituency/:id', function(req, res) {
  subconstituencyMgr.getsub(req.params.id,function(result){
    res.send(result);
  })
});
/* get center  . */
router.get('/getcenter/:ido/:ids', function(req, res) {
  centerMgr.getCentersS(req.params.ido,req.params.ids,function(result){
    res.send(result);
  })
});
/* checkEmail employee  . */
router.post('/checkEmail', function(req, res) {
  employeeMgr.checkEmail(req.body.email, function(result){
    if(!result[0]){
      res.send(true);
    } else {
      res.send(false);
    }
  });
});
/* Edit employee . */
router.post('/edit', function(req, res) {
  if(req.body.name=="phone_number"){
    var sender = model_step_phone(req.body,req.session.iduser);
        res.send(sender);
  }else{
  if(req.body.name=="email"){
    employeeMgr.checkEmail(req.body.value, function(result){
      if(!result[0]){
        /* log function. */
        var sender = model_step(req.body,req.session.iduser);
        res.send(sender);
      } else {
        res.status = "exist";
        res.send({status : "خطأ", value:true, msg:"هذا البريد موجود من قبل" });
      }
    });
  } else {
    /* log function. */
    var sender = model_step(req.body,req.session.iduser);
    res.send(sender);
  }}
});
function model_step(body,id){
  var flag;
  Step(
    /* SELECT OLD VALUE FROM DB */
    function SelectOld() {
      logMgr.addLog(body,id,"employee","idemployee",this);
    },
    /* UPDATE VALUE */
    function Update(err,result) {
      employeeMgr.editEmployee(body,result,this);
    },
    /* INSERT INFORMATION INTO LOG */
    function InsertLog(err,result) {
      if(!result[0]){
        flag=false;
      } else {
        flag=true;
      }
      logMgr.insertLog(id,"edit","employee",result,body.pk,body.value);
    }
  );
  return flag;
}
function model_step_phone(body,id){
  var flag;
  Step(
    /* SELECT OLD VALUE FROM DB */
    function SelectOldphone() {
      logMgr.addLog(body,id,"phone","idphone",this);
    },
    /* UPDATE VALUE */
    function Updatephone(err,result) {
      phoneMgr.editphone(body,result,this);
    },
    /* INSERT INFORMATION INTO LOG */
    function InsertLogphone(err,result) {
      if(!result[0]){
        flag=false;
      } else {
        flag=true;
      }
      logMgr.insertLog(id,"edit","phone",result,body.pk,body.value);
    }
  );
  return flag;
}
module.exports = router;