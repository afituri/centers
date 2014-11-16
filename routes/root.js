var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var userMgr = require('../app/user').userMgr;
var logMgr = require('../app/log').repoMgr;
var officeMgr = require('../app/office').officeMgr;
/* GET home page. */
router.get('/', function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  userMgr.getUsers(limit, function(results){
    var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
    var pagination = userHelpers.paginate(page,pageCount);
    res.render('root',{title: 'المستخدمين', users : results[0], pagination : pagination});
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
    res.render('edituser',{title: 'تعديل مستجدم', user : result});
  });
});
/* POST adduser form for root */
router.post('/adduser', userHelpers.isRoot, function(req, res) {
  userHelpers.addUser(req.body, function (results){
    logMgr.insertLog(req.session.iduser,"add","user"," add new user name : "+results.name,results.id);
    res.redirect('/root');
  });
});
/* get userby id form for root */
router.get('/getUser/:id', function(req, res) {
  userMgr.getUser(req.params.id,function(result){
    res.send(result);
  });
});
/* Delete user page. */
router.get('/deleteUser/:id', function(req, res) {
  userMgr.delUser(req.params.id,function(result){
    logMgr.insertLog(req.session.iduser,"delete","user"," delete user ",req.params.id);
    logMgr.insertLog(req.session.iduser,"delete","phone"," delete phones ",req.params.id);
    res.send(result);
  });
});

module.exports = router;