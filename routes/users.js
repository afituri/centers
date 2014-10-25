var express = require('express');
var router = express.Router();
var userMgr = require('../app/user').userMgr;

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

module.exports = router;
