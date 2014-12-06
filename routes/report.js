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
      res.render('report',{title: 'التقارير',name:req.session.name,result:results[0], pagination : pagination,level:req.session.level});
    }else{
      res.render('report',{title: 'التقارير',name:req.session.name,result:res, pagination : null,level:req.session.level});
    }
  }); 
});
module.exports = router;