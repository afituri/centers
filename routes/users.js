var express = require('express');
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    easyPbkdf2 = require("easy-pbkdf2")();
var userMgr = require('../app/user').userMgr;
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
  if(req.body.name=="email"){
    userMgr.checkEmail(req.body.value, function(result){
      if(!result[0]){
        var sender=edit_user(req.body);
        res.send(sender);
      } else {
        res.status = "exist";
        res.send({status : "خطأ", value:true, msg:"هذا البريد موجود من قبل" });
      }
    });
  } else {
   var sender=edit_user(req.body);
    res.send(sender);
  }
});
function edit_user(body){
  userMgr.editUser(body, function(result){
      if(!result[0]){
        return false;
      } else {
        return true;
      }
    });
}
 
module.exports = router;
