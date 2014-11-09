var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var userMgr = require('../app/user').userMgr;
var log = require('../app/log').repo;
var employeeMgr = require('../app/user').employeeMgr;


/* GET home page. */
router.get('/', function(req, res) {
  employeeMgr.getemployee(req.params.iduser,req.params.level,function(results){
    res.render('employee',{title: 'الموظفين'});
  });
});

/* GET editemployee page. */
router.get('/editemployee', function(req, res) {
  res.render('editemployee', { title: "تعديل الموظفين" });
});

module.exports = router;