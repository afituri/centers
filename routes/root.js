var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var userMgr = require('../app/user').userMgr;


/* GET home page. */
router.get('/', function(req, res) {
  userMgr.getUsers(function(results){
    res.render('root',{title: 'المستخدمين', users : results});
  })
});

router.get('/adduser', function(req, res) {
  res.render('adduser', { title: 'إضافة مستخدم' });
});

router.get('/editroot/:id', function(req, res) {
  userMgr.getUser(req.params.id,function(result){
    res.render('editroot',{title: 'تعديل مستجدم', user : result});
  })
});

/* POST adduser form for root */
router.post('/adduser', function(req, res) {
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
router.get('/deleteUser/:id', function(req, res) {
  userMgr.delUser(req.params.id,function(result){
    res.send(result);
  })
});
module.exports = router;