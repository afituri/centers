var express = require('express');
var router = express.Router();

/* GET home page. */

/* GET constits page. */
router.get('/addconstit', function(req, res) {
  res.render('addconstit', { title: "اللجان  الأنتخابية" });
});


/* GET id  page. */
router.get('/:id', function(req, res) {
  res.render('constits', { title: 'Express' });
});


/* GET id  page. */
router.get('/:id/:cid', function(req, res) {
  res.render('constit', { title: 'Express' });
});

/* GET home page. */
router.get('/:id/:cid/center', function(req, res) {
  res.render('center', { title: 'Express' });
});




module.exports = router;
