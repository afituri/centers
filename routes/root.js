var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var userMgr = require('../app/user').userMgr;
var logMgr = require('../app/log').repoMgr;
var officeMgr = require('../app/office').officeMgr;
var phoneMgr = require('../app/phone').phoneMgr;
var res =[];

/* Delete user phone. */
router.get('/deletePhone/:id', function(req, res) {
  phoneMgr.deletePhone(req.params.id,function(result){
    logMgr.insertLog(req.session.iduser,"delete","phone"," delete phone ",req.params.id,result[0].phone_number);
    res.send(result);
  });
});
/* searchByname user  */
router.get('/searchUser/:id', function(req, res) {
  userMgr.searchUser(req.params.id,function(result){
    res.send(result);
  })
});
/* GET home page. */
router.get('/',userHelpers.isRoot,function(req, res) {
  req.session.back = req.originalUrl;
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  userMgr.getUsers(limit, function(results){
    if(results[1][0] != undefined){
      var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
      var pagination = userHelpers.paginate(page,pageCount);
      res.render('root',{title: 'المستخدمين',name:req.session.name, users : results[0], pagination : pagination});
    }else{
      res.render('root',{title: 'المستخدمين',name:req.session.name, users : res, pagination : null});
    }
  });
});
/* Add user page. */
router.get('/adduser',userHelpers.isRoot, function(req, res) {
  officeMgr.getOffice(function(result){
    res.render('adduser', { title: 'إضافة مستخدم' , offices : result  });
  });
});
/* Edit user page. */
router.get('/edituser/:id',userHelpers.isRoot, function(req, res) {
  userMgr.getUser(req.params.id,function(result){
    res.render('edituser',{title: 'تعديل مستجدم', user : result, url : req.session.back});
  });
});
/* POST adduser form for root */
router.post('/adduser', userHelpers.isRoot, function(req, res) {
  userHelpers.addUser(req.body, function (results){
    logMgr.insertLog(req.session.iduser,"add","user"," add new user name : "+results.name,results.id,results.name);
    res.redirect('/root');
  });
});
/* get userby id form for root */
router.get('/getUser/:id', function(req, res) {
  userMgr.getUser(req.params.id,function(result){
    res.send(result);
  });
});
/* GET  phones. */
router.get('/getphone/:id', function(req, res) {
  phoneMgr.getphoneUser(req.params.id,function(result){
    res.send(result);
  })
});
/* Delete user page. */
router.get('/deleteUser/:id', function(req, res) {
  userMgr.delUser(req.params.id,function(result,resultz){
    logMgr.insertLog(req.session.iduser,"delete","user"," delete user ",req.params.id,resultz[0].name);
    for(key in result){
      logMgr.insertLog(req.session.iduser,"delete","phone"," delete phone ",result[key].idphone,result[key].phone_number);
    }
    res.send(result);
  });
});
module.exports = router;