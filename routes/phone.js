var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var userMgr = require('../app/user').userMgr;
var logMgr = require('../app/log').repoMgr;
var employeeMgr = require('../app/employee').employeeMgr;
var phoneMgr = require('../app/phone').phoneMgr;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('phone',{title: 'ارقام الهواتف'});
});
/* GET editphone page. */
router.get('/editphone', function(req, res) {
  res.render('editphone', { title: "تعديل ارقام الهواتف" });
});
/* POST addphone  */
router.post('/addphone', function(req, res) {
  var phone = req.body.phone;
  var type = req.body.phone_type
  var p_type = req.body.p_type
  for (var i=0;i<phone.length;i++) {
    phoneMgr.addphone(req.session.iduser,phone[i],type[i],p_type[i],req.body.user_id[0],req.body.user_type[0], function (results){ });
  }
  res.redirect('/root/edituser/'+req.body.user_id[0]);
});
/* POST addphoneM  */
router.post('/addphoneM', function(req, res) {
  var phone = req.body.phone;
  var type = req.body.phone_type
  var p_type = req.body.p_type
  for (var i=0;i<phone.length;i++) {
    phoneMgr.addphone(req.session.iduser,phone[i],type[i],p_type[i],req.body.user_id[0],req.body.user_type[0], function (results){ });
  }
  res.redirect('/admin/editmanager/'+req.body.user_id[0]);
});
router.post('/addphoneE', function(req, res) {
  var phone = req.body.phone;
  var type = req.body.phone_type
  var p_type = req.body.p_type
  for (var i=0;i<phone.length;i++) {
    phoneMgr.addphone(req.session.iduser,phone[i],type[i],p_type[i],req.body.user_id[0],req.body.user_type[0], function (results){ });
  }
  res.redirect('/employee/editemployee/'+req.body.user_id[0]);
});
module.exports = router;