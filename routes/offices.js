var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('offices', { title: "اللجان  الأنتخابية" });
});

/* GET constits page. */
router.get('/addoffice', function(req, res) {
  res.render('addoffice', { title: "اللجان  الأنتخابية" });
});

/* GET id  page. */
router.get('/:id', function(req, res) {
  res.render('centers', { title: 'Centers' });
});


/* GET id  page. */
router.get('/:id/:cid', function(req, res) {
  res.render('center', { title: 'Express' });
});


module.exports = router;
