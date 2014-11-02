var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var userMgr = require('../app/user').userMgr;


/* GET home page. */
router.get('/', function(req, res) {
  userMgr.getManager(function(results){
    res.render('admin',{title: 'المدراء', users : results});
  })
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
  })
});
/* Add manager */
router.get('/addmanager', function(req, res) {
  userMgr.getOffice(function(result){
    res.render('addmanager', { title: 'اضافة مدير', offices : result });
  })
});
/* POST Add manager form for abmin */
router.post('/addmanager', function(req, res) {
  console.log(req.body);
  userHelpers.addUser(req.body, function (results){
    userMgr.getManager(function(results){
      res.render('admin', { title: 'اضافة مدير' , users : results});
    });
  });
});
/* Delete manager by id */
router.get('/deleteUser/:id', function(req, res) {
  userMgr.delUser(req.params.id,function(result){
    res.send(result);
  })
});

module.exports = router;