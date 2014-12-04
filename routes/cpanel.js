var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var userMgr = require('../app/user').userMgr;
var log = require('../app/log').repo;

/* GET home page. */
router.get('/', userHelpers.isRoot,function(req, res) {
  req.session.back = req.originalUrl;
  res.render('cpanel',{title: 'لوحة التحكم',name:req.session.name});
});
/* GET home page. */
router.get('/cpanelAdmin', userHelpers.isAdmin,function(req, res) {
  req.session.back = req.originalUrl;
  res.render('cpanelAdmin',{title: 'لوحة التحكم',name:req.session.name});
});
module.exports = router;