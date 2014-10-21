var express = require('express');
var router = express.Router();

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
module.exports = router;
