var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var userMgr = require('../app/user').userMgr;
var centerMgr = require('../app/center').centerMgr;
var log = require('../app/log').repo;
var employeeMgr = require('../app/employee').employeeMgr;
<<<<<<< HEAD
=======

>>>>>>> 36dc000e0d77faf1f05edf0186cf128e01370b4c

/* GET home page. */
router.get('/', function(req, res) {
  employeeMgr.getemployee(req.session.iduser,req.session.level,function(results){
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

module.exports = router;