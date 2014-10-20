var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET constits page. */
router.get('/constits', function(req, res) {
  res.render('constits', { title: "اللجان  الأنتخابية" });
});

/* GET constits page. */
router.get('/constits/addconstit', function(req, res) {
  res.render('addconstit', { title: "اللجان  الأنتخابية" });
});


module.exports = router;
