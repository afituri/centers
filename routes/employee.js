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


/* GET home page. */
router.get('/', function(req, res) {
  employeeMgr.getemployees(req.session.iduser,req.session.level,req.session.office_idoffice,function(results){
    res.render('employee',{title: 'الموظفين',employees:results});
  });
});

/* GET editemployee page. */
router.get('/editemployee/:id', function(req, res) {
  employeeMgr.getemployee(req.params.id,function(result){
    res.render('editemployee', { title: "تعديل الموظفين", employee : result[0],phone : result[1] });
  });
});

/* GET centers. */
router.get('/getCenters', function(req, res) {
  centerMgr.getCenters(function(result){
    res.send(result);
  })
});

/* add employee. */
router.post('/addemployee', userHelpers.isRoot, function(req, res) {
  employeeMgr.addemployee(req.body, function (results){
    logMgr.insertLog(req.session.iduser,"add","employee"," add new employee name : "+results.name,results.id);
    res.redirect('/employee');
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
  logMgr.insertLog(req.session.iduser,"delete","employee"," delete employee ",req.params.id);
  logMgr.insertLog(req.session.iduser,"delete","phone"," delete phones employee",req.params.id);
  employeeMgr.deleteemployee(req.params.id,function(result){
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
  centerMgr.getCentersSub(req.params.ido,req.params.ids,function(result){
    res.send(result);
  })
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
      logMgr.insertLog(id,"edit","employee",result,body.pk);
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
      logMgr.insertLog(id,"edit","phone",result,body.pk);
    }
  );
  return flag;
}
module.exports = router;