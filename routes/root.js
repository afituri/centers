var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var userMgr = require('../app/user').userMgr;


/* GET home page. */
router.get('/', function(req, res) {
  userMgr.getUsers(function(results){
    res.render('root',{title: 'root', users : results});
  })
});

router.get('/adduser', function(req, res) {
  res.render('adduser', { title: 'إضافة مستخدم' });
});

/* POST adduser form for root */
router.post('/adduser', function(req, res) {
  userHelpers.addUser(req, function (results){
    userMgr.getUsers(function(results){
      res.render('root',{title: 'root', users : results});
    });
  });
});

module.exports = router;