var express = require('express');
var userManager = require('../app/user');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  res.render('root', { title: 'root' });
});

router.get('/adduser', function(req, res) {
  res.render('adduser', { title: 'إضافة مستخدم' });
});

/* POST adduser form for root */
router.post('/adduser', function(req, res) {
  userManager.adduser(req, function (results){
  	res.render('root', { title: 'root' });
  });
});

module.exports = router;