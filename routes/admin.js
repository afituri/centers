var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var userMgr = require('../app/user').userMgr;
var logMgr = require('../app/log').repoMgr;
var officeMgr = require('../app/office').officeMgr;
var employeeMgr = require('../app/employee').employeeMgr;
var phoneMgr = require('../app/phone').phoneMgr;
var res =[];

/* GET home page. */

router.get('/',userHelpers.isAdmin,function(req, res) {
  req.session.back = req.originalUrl;
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  userMgr.getManager(limit, function(results){
    if(results[1][0] != undefined){
      var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
      var pagination = userHelpers.paginate(page,pageCount);
      res.render('admin',{title: 'المدراء',name:req.session.name, users : results[0], pagination : pagination,level:req.session.level});
    }else{
      res.render('admin',{title: 'المدراء',name:req.session.name, users : res, pagination : null,level:req.session.level});
    }
  })
});

/* search manager by name. */
router.get('/searchManager/:id',function(req, res) {
  userMgr.searchManager(req.params.id,function(result){
    res.send(result);
  })
});
/* GET All phoneEmployee page. */
router.get('/phoneEmployeeAll',userHelpers.isManager,function(req, res) {
  req.session.back = req.originalUrl;
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  employeeMgr.getAllEmployee(limit,function(result){
    if(results[1][0] != undefined){
      var pageCount = userHelpers.getPageCount(result[1][0].cnt); //cnt is the total count of records
      var pagination = userHelpers.paginate(page,pageCount);
      res.render('phoneEmployeeAll',{title: 'ارقام هواتف الموظفين', employees : result[0], pagination : pagination});
    }else{
      res.render('phoneEmployeeAll',{title: 'ارقام هواتف الموظفين', employees : res, pagination : null});
    }
  });
});
/* GET phoneManager page. */
router.get('/phoneManager',userHelpers.isAdmin,function(req, res) {
  req.session.back = req.originalUrl;
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  userMgr.getManager(limit, function(results){
     if(results[1][0] != undefined){
      var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
      var pagination = userHelpers.paginate(page,pageCount);
      res.render('phoneManager',{title: 'ارقام هواتف المدراء', managers : results[0], pagination : pagination});
    }else{
      res.render('phoneManager',{title: 'ارقام هواتف المدراء', managers : res, pagination : null});
    }
  });
});
/* GET employee phones. */
router.get('/getPhoneManager/:id',function(req, res) {
  phoneMgr.getPhoneManager(req.params.id,function(result){
    res.send(result);
  })
});
/* GET control panel page. */
router.get('/cpanelmanager', userHelpers.isManager,function(req, res) {
  res.render('cpanelmanager',{title: 'لوحة التحكم للمدراء'});
});
/* Get user by level form for admin */
router.get('/getManager/:level', function(req, res) {
  userMgr.getManager(function(result){
    res.send(result);
  })
});
/* Edit manager */
router.get('/editmanager/:id',userHelpers.isAdmin,function(req, res) {
  userMgr.getUser(req.params.id,function(result){
    res.render('editmanager',{title: 'تعديل المدراء', user : result , url : req.session.back});
  });
});
/* Add manager */
router.get('/addmanager',userHelpers.isAdmin,function(req, res) {
  officeMgr.getOffice(function(result){
    res.render('addmanager', { title: 'اضافة مدير', offices : result });
  })
});
/* POST Add manager form for abmin */
router.post('/addmanager',function(req, res) {
  userHelpers.addUser(req.body, function (results){
    logMgr.insertLog(req.session.iduser,"add","user"," add new user name : "+results.name,results.id,results.name);
    res.redirect('/admin');
  });
});
/* Delete manager by id */
router.get('/deleteUser/:id',userHelpers.isAdmin,function(req, res) {
  userMgr.delUser(req.params.id,function(result,resultz){
    logMgr.insertLog(req.session.iduser,"delete","user"," delete user ",req.params.id,resultz[0].name);
    for(key in result){
      logMgr.insertLog(req.session.iduser,"delete","phone"," delete phone ",result[key].idphone,result[key].phone_number);
    }
    res.send(result);
  })
});
/* get oll afeses */
router.get('/getoffice',userHelpers.isAdmin,function(req, res) {
  officeMgr.getOffice(function(result){
    res.send(result);
  })
});

module.exports = router;