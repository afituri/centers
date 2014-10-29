var express = require('express');
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    easyPbkdf2 = require("easy-pbkdf2")();
var userMgr = require('../app/user').userMgr;
var router = express.Router();
//var login = require('../app/login')(router);

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

router.post('/edit', function(req, res) {
  userMgr.editUser(req.body, function(result){
    if(!result[0]){
      res.send(false);
    } else {
      res.send(true);
    }
  });
});


module.exports = router;
