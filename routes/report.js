var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var logMgr = require('../app/log').repoMgr;

/* GET home page. */
router.get('/', userHelpers.isAdmin,function(req, res) {
  logMgr.report(function(results){
    res.render('report',{title: 'التقارير',result:results});
  }); 
});

module.exports = router;