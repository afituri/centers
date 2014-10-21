var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('root', { title: 'root' });
});

router.get('/adduser', function(req, res) {
  res.render('adduser', { title: 'إضافة مستخدم' });
});

module.exports = router;