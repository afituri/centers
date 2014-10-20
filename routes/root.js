var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('', { title: 'root' });
});

router.get('/adduser', function(req, res) {
  res.render('adduser', { title: 'adduser' });
});

module.exports = router;