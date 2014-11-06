var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var userMgr = require('../app/user').userMgr;
var log = require('../app/log').repo;


/* GET home page. */
router.get('/', function(req, res) {
  userMgr.getManager(function(results){
    res.render('admin',{title: 'المدراء', users : results});
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
  userMgr.getOffice(function(result){
    res.render('addmanager', { title: 'اضافة مدير', offices : result });
  })
});
/* POST Add manager form for abmin */
router.post('/addmanager', function(req, res) {
  userHelpers.addUser(req.body, function (results){
    log.insertLog(req.session.iduser,"add","user"," add new user name : "+results.name,results.id);
    userMgr.getManager(function(results){
      res.render('admin', { title: 'اضافة مدير' , users : results});
    });
  });
});
/* Delete manager by id */
router.get('/deleteUser/:id', function(req, res) {
  userMgr.delUser(req.params.id,function(result){
    log.insertLog(req.session.iduser,"delete","user"," delete user ",req.params.id);
    res.send(result);
  })
});
/* get oll afeses */
router.get('/getofes', function(req, res) {
  userMgr.getofes(function(result){
    res.send(result);
  })
});
module.exports = router;