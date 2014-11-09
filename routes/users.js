var express = require('express');
var Step = require('step');
var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
easyPbkdf2 = require("easy-pbkdf2")();
var userMgr = require('../app/user').userMgr;
var log = require('../app/log').repo;
var router = express.Router();
var login = require('../app/login')(router);
/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});
router.get('/login', function(req, res) {
  res.render('login',{ title: 'تسجيل الدخول' });
});
router.get('/login/reset', function(req, res) {
  res.render('reset',{ title: 'تغير كلمة المرور' });
});
router.post('/checkEmail', function(req, res) {
  userMgr.checkEmail(req.body.email, function(result){
    if(!result[0]){
      res.send(true);
    } else {
      res.send(false);
    }
  });
});
/* Edit user . */
router.post('/edit', function(req, res) {
  if(req.body.name=="phone_number"){
    var sender = model_step_phone(req.body,req.session.iduser);
        res.send(sender);
  }else{
  if(req.body.name=="email"){
    userMgr.checkEmail(req.body.value, function(result){
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
      log.addLog(body,id,"user","iduser",this);
    },
    /* UPDATE VALUE */
    function Update(err,result) {
      userMgr.editUser(body,result,this);
    },
    /* INSERT INFORMATION INTO LOG */
    function InsertLog(err,result) {
      if(!result[0]){
        flag=false;
      } else {
        flag=true;
      }
      log.insertLog(id,"edit","user",result,body.pk);
    }
    );
  return flag;
}
function model_step_phone(body,id){
  var flag;
  Step(
    /* SELECT OLD VALUE FROM DB */
    function SelectOldphone() {
      log.addLog(body,id,"phone","idphone",this);
    },
    /* UPDATE VALUE */
    function Updatephone(err,result) {
      userMgr.editphone(body,result,this);
    },
    /* INSERT INFORMATION INTO LOG */
    function InsertLogphone(err,result) {
      if(!result[0]){
        flag=false;
      } else {
        flag=true;
      }
      log.insertLog(id,"edit","phone",result,body.pk);
    }
    );
  return flag;
}
module.exports = router;