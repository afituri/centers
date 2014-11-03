var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var userMgr = require('../app/user').userMgr;

/* GET home page. */
router.get('/',userHelpers.isRoot, function(req, res) {
  userMgr.getUsers(function(results){
    res.render('root',{title: 'المستخدمين', users : results});
  })
});
/* Add user page. */
router.get('/adduser',userHelpers.isRoot, function(req, res) {
  userMgr.getOffice(function(result){
    res.render('adduser', { title: 'إضافة مستخدم' , offices : result  });
  })
});
/* Edit user page. */
router.get('/editroot/:id',userHelpers.isRoot, function(req, res) {
  userMgr.getUser(req.params.id,function(result){
    res.render('editroot',{title: 'تعديل مستجدم', user : result});
  })
});
/* POST adduser form for root */
router.post('/adduser', userHelpers.isRoot, function(req, res) {
  userHelpers.addUser(req.body, function (results){
    userMgr.getUsers(function(results){
      res.render('root',{title: 'المستخدمين', users : results});
    });
  });
});
/* get userby id form for root */
router.get('/getUser/:id', function(req, res) {
  userMgr.getUser(req.params.id,function(result){
    res.send(result);
  })
});
/* Delete user page. */
router.get('/deleteUser/:id', function(req, res) {
  userMgr.delUser(req.params.id,function(result){
    res.send(result);
  })
});

module.exports = router;