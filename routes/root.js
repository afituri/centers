var express = require('express');
var userManager = require('../app/userHelpers');
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
  userManager.addUser(req, function (results){
  	res.render('root', { title: 'root' });
  });
});

module.exports = router;