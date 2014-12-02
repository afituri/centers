var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var logMgr = require('../app/log').repoMgr;
var res =[];

/* GET home page. */
router.get('/', userHelpers.isAdmin,function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  logMgr.report(limit,function(results){
    if(results[1][0] != undefined){
      var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
      var pagination = userHelpers.paginate(page,pageCount);
      res.render('report',{title: 'التقارير',result:results[0], pagination : pagination});
    }else{
      res.render('report',{title: 'التقارير',result:res, pagination : null});
    }
  }); 
});
module.exports = router;