var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var userMgr = require('../app/user').userMgr;
var centerMgr = require('../app/center').centerMgr;
var logMgr = require('../app/log').repoMgr;
var employeeMgr = require('../app/employee').employeeMgr;
var phoneMgr = require('../app/phone').phoneMgr;


/* GET home page. */
router.get('/', function(req, res) {
  employeeMgr.getemployee(req.session.iduser,req.session.level,req.session.office_idoffice,function(results){
    res.render('employee',{title: 'الموظفين',employees:results});
  });
});

/* GET editemployee page. */
router.get('/editemployee/:id', function(req, res) {
  employeeMgr.getemployee(req.params.id,function(result){
    res.render('editemployee', { title: "تعديل الموظفين", user : result });
  });
});

/* GET centers. */
router.get('/getCenters', function(req, res) {
    centerMgr.getCenters(function(result){
    res.send(result);
  })
});

/* GET addemployee page. */
router.get('/addemployee', function(req, res) {
  res.render('addemployee', { title: "اضافه موظفين" });
});
/* GET employee phones. */
router.get('/getphone/:id', function(req, res) {
  phoneMgr.getphone(req.params.id,function(result){
    res.send(result);
  })
});

module.exports = router;