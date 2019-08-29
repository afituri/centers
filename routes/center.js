var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var centerMgr = require('../app/center').centerMgr;
var employeeMgr = require('../app/employee').employeeMgr;
var employeess =[];
var employee_type = require('../employee_type.json');
var job = require('../job.json');

router.get('/:cid',userHelpers.isCenter, function(req, res) {
  console.log("im in center")
  centerMgr.getCenter(req.params.cid,function(results){
    var page = userHelpers.getPage(req);
    var limit = userHelpers.getLimit(page);
    
    employeeMgr.getEmployeeCenter(limit,req.params.cid,function(result){
      if(result[1][0] != undefined){
        var pageCount = userHelpers.getPageCount(result[1][0].cnt); //cnt is the total count of records
        var pagination = userHelpers.paginate(page,pageCount);
        res.render('center', { title: 'مركز البيانات ' , cent : results,employees:result[0], pagination : pagination , url : req.session.back,employee_type:employee_type,job:job });
      } else {
        res.render('center', { title: 'مركز البيانات ' , cent : results,employees:employeess, pagination : null, url : req.session.back,employee_type:employee_type,job:job });
      }
    });
  });
});

/* search searchEmpInCenter. */
router.get('/searchEmpInCenter/:id/:idc',function(req, res) {
  employeeMgr.searchEmpInCenter(req.params.id,req.params.idc,function(result){
    res.send(result);
  })
});

module.exports = router;