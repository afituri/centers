var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var userMgr = require('../app/user').userMgr;
var logMgr = require('../app/log').repo;
var officeMgr = require('../app/office').officeMgr;
var employeeMgr = require('../app/employee').employeeMgr;
var phoneMgr = require('../app/phone').phoneMgr;

/* GET home page. */
router.get('/', function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  userMgr.getManager(limit, function(results){
    var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
    var pagination = userHelpers.paginate(page,pageCount);
    res.render('admin',{title: 'المدراء', users : results[0], pagination : pagination});
  })
});

/* GET phoneEmployee page. */
router.get('/phoneEmployee', function(req, res) {
  employeeMgr.getEmployee(function(result){
    res.render('phoneEmployee',{title: 'ارقام هواتف الموظفين', employees : result});
  });
});

/* GET phoneManager page. */
router.get('/phoneManager', function(req, res) {
  userMgr.getManager(function(result){
    res.render('phoneManager',{title: 'ارقام هواتف المدراء', managers : result});
  });
});

/* GET employee phones. */
router.get('/getPhoneManager/:id', function(req, res) {
  phoneMgr.getPhoneManager(req.params.id,function(result){
    res.send(result);
  })
});

/* GET control panel page. */
router.get('/cpanelmanager', function(req, res) {
  res.render('cpanelmanager',{title: 'لوحة التحكم للمدراء'});
});

/* Get user by level form for admin */
router.get('/getManager/:level', function(req, res) {
  userMgr.getManager(function(result){
    res.send(result);
  })
});
/* Edit manager */
router.get('/editmanager/:id', function(req, res) {
  userMgr.getUser(req.params.id,function(result){
    res.render('editmanager',{title: 'تعديل المدراء', user : result});
  });
});
/* Add manager */
router.get('/addmanager', function(req, res) {
  officeMgr.getOffice(function(result){
    res.render('addmanager', { title: 'اضافة مدير', offices : result });
  })
});
/* POST Add manager form for abmin */
router.post('/addmanager', function(req, res) {
  userHelpers.addUser(req.body, function (results){
    logMgr.insertLog(req.session.iduser,"add","user"," add new user name : "+results.name,results.id);
    userMgr.getManager(function(results){
      res.render('admin', { title: 'اضافة مدير' , users : results});
    });
  });
});
/* Delete manager by id */
router.get('/deleteUser/:id', function(req, res) {
  userMgr.delUser(req.params.id,function(result){
    logMgr.insertLog(req.session.iduser,"delete","user"," delete user ",req.params.id);
    logMgr.insertLog(req.session.iduser,"delete","phone"," delete phones ",req.params.id);
    res.send(result);
  })
});
/* get oll afeses */
router.get('/getoffice', function(req, res) {
  officeMgr.getOffice(function(result){
    res.send(result);
  })
});

module.exports = router;