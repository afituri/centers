var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var userMgr = require('../app/user').userMgr;
var logMgr = require('../app/log').repoMgr;
var employeeMgr = require('../app/employee').employeeMgr;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('phone',{title: 'ارقام الهواتف'});
});
/* GET editphone page. */
router.get('/editphone', function(req, res) {
  res.render('editphone', { title: "تعديل ارقام الهواتف" });
});

module.exports = router;