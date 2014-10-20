var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('admin', { title: 'المدراء' });
});

router.get('/addmanager', function(req, res) {
  res.render('addmanager', { title: 'اضافة مدير' });
});

module.exports = router;