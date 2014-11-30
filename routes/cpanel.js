var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var userMgr = require('../app/user').userMgr;
var log = require('../app/log').repo;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('cpanel',{title: 'لوحة التحكم',name:req.session.name});
});

module.exports = router;