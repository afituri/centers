var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var userMgr = require('../app/user').userMgr;
var log = require('../app/log').repo;
/* GET home page. */
router.get('/',userHelpers.isRoot, function(req, res) {
  userMgr.getUsers(function(results){
    res.render('root',{title: 'المستخدمين', users : results});
  });
});
/* Add user page. */
router.get('/adduser',userHelpers.isRoot, function(req, res) {
  userMgr.getOffice(function(result){
    res.render('adduser', { title: 'إضافة مستخدم' , offices : result  });
  });
});
/* Edit user page. */
router.get('/edituser/:id',userHelpers.isRoot, function(req, res) {
  userMgr.getUser(req.params.id,function(result){
    console.log("im in root"+result);
    res.render('edituser',{title: 'تعديل مستجدم', user : result});
  });
});
/* POST adduser form for root */
router.post('/adduser', userHelpers.isRoot, function(req, res) {
  userHelpers.addUser(req.body, function (results){
    log.insertLog(req.session.iduser,"add","user"," add new user name : "+results.name,results.id);
    userMgr.getUsers(function(results){
      res.render('root',{title: 'المستخدمين', users : results});
    });
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
    log.insertLog(req.session.iduser,"delete","user"," delete user ",req.params.id);
    log.insertLog(req.session.iduser,"delete","phone"," delete phones ",req.params.id);

    res.send(result);
  });
});

module.exports = router;