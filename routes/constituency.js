var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var userMgr = require('../app/user').userMgr;
var log = require('../app/log').repo;

/* GET home page. */
router.get('/', function(req, res) {
    res.render('constituency',{title: 'الدوائر الرئيسيه'});
});

/* GET editconstituency page. */
router.get('/editconstituency', function(req, res) {
  res.render('editconstituency', { title: "تعديل الدوائر الرئيسيه" });
});

module.exports = router;