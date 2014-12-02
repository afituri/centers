var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var centerMgr = require('../app/center').centerMgr;
var employeeMgr = require('../app/employee').employeeMgr;
var employeess =[];
router.get('/:cid',userHelpers.isCenter, function(req, res) {
  centerMgr.getCenter(req.params.cid,function(results){
    req.session.back = req.originalUrl;
    console.log(req.session.back+"print me");
    var page = userHelpers.getPage(req);
    var limit = userHelpers.getLimit(page);
    employeeMgr.getEmployeeCenter(limit,req.params.cid,function(result){
      if(result[1][0] != undefined){
        var pageCount = userHelpers.getPageCount(result[1][0].cnt); //cnt is the total count of records
        var pagination = userHelpers.paginate(page,pageCount);
        res.render('center', { title: 'مركز البينات ' , cent : results,employees:result[0], pagination : pagination , url: req.session.back});
      } else {
        res.render('center', { title: 'مركز البينات ' , cent : results,employees:employeess, pagination : null });
      }
    });
  });
});
module.exports = router;