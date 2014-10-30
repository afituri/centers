var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  res.render('centers', { title: "بيانات المراكز" });
});

/* GET manager page. */
router.get('/centers', function(req, res) {
  res.render('centers', { title: "بيانات المراكز" });
});

/* Edit ceters */
router.get('/editcenters/:id', function(req, res) {
  
  res.render('editcenters',{title: 'تعديل المراكز'});
 
});

module.exports = router;