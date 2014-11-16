var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var centerMgr = require('../app/center').centerMgr;
var employeeMgr = require('../app/employee').employeeMgr;

router.get('/:cid', function(req, res) {
  centerMgr.getCenter(req.params.cid,function(results){
    var page = userHelpers.getPage(req);
    var limit = userHelpers.getLimit(page);
    employeeMgr.getEmployeeCenter(limit,req.params.cid,function(result){
      var pageCount = userHelpers.getPageCount(result[1][0].cnt); //cnt is the total count of records
      var pagination = userHelpers.paginate(page,pageCount);
      res.render('center', { title: 'مركز البينات ' , cent : results,employees:result[0], pagination : pagination });
    });
  });
});
module.exports = router;
