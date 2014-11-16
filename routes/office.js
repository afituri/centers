var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var userMgr = require('../app/user').userMgr;
var logMgr = require('../app/log').repoMgr;
var officeMgr = require('../app/office').officeMgr;
var subconstituencyMgr = require('../app/subconstituency').subconstituencyMgr;
var villageMgr = require('../app/village').villageMgr;
var centerMgr = require('../app/center').centerMgr;
var mahallaMgr = require('../app/mahalla').mahallaMgr;

/* GET home office  page. */
router.get('/', function(req, res) {
  officeMgr.getOffice(function(result){
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
    centerMgr.getCenters(limit,function(results){
      var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
      var pagination = userHelpers.paginate(page,pageCount);
      res.render('office', { title: "اللجان  الأنتخابية" , offices : result,centers : results[0],pagination : pagination});
    })
  });
});
/* GET office by id  page. */
router.get('/:oid', function(req, res) {
  subconstituencyMgr.getsub(req.params.oid,function(result){
    var page = userHelpers.getPage(req);
    var limit = userHelpers.getLimit(page);
    centerMgr.getCentersOffice(limit,req.params.oid,function(results){
      var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
      var pagination = userHelpers.paginate(page,pageCount);
      officeMgr.getNameOffice(req.params.oid,function(resultNames){
        res.render('officeManager', { title: "اللجان  الأنتخابية" , sub : result, centers : results[0], names : resultNames,pagination : pagination});
      })
    })
  })
});
/* GET subconstitunecy page. */
router.get('/:oid/:sid', function(req, res) {
  villageMgr.getvillage(req.params.sid,function(result){
    var page = userHelpers.getPage(req);
    var limit = userHelpers.getLimit(page);
    centerMgr.getCentersSub(limit,req.params.oid,req.params.sid,function(results){
      var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
      var pagination = userHelpers.paginate(page,pageCount);
      officeMgr.getNameOfficeSubconstit(req.params.oid,req.params.sid,function(resultOne){
        res.render('subconstituency', { title: ' الدوائر  الأنتخابية الفرعيه' , officeid :req.params.oid , villages : result, centers : results[0], names : resultOne ,pagination : pagination});
      })      
    })
  })
});
/* GET village page. */
router.get('/:oid/:sid/:vid', function(req, res) {
  mahallaMgr.getmahalla(req.params.vid,function(result){
    var page = userHelpers.getPage(req);
    var limit = userHelpers.getLimit(page);
    centerMgr.getCentersvillage(limit,req.params.oid,req.params.sid,req.params.vid,function(results){
      var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
      var pagination = userHelpers.paginate(page,pageCount);
      officeMgr.getNameOfficeSubconstitVillage(req.params.oid,req.params.sid,req.params.vid,function(resultNames){
        res.render('village', { title: 'المدينة/القرية' , officeid : req.params.oid , subbid  : req.params.sid , mahallas : result , centers : results[0], names : resultNames,pagination : pagination});
      })  
    })
  })        
});
/* GET mahalla page. */
router.get('/:oid/:sid/:vid/:mid', function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  centerMgr.getCentersmahlla(limit,req.params.oid,req.params.sid,req.params.vid,req.params.mid,function(results){
    var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
    var pagination = userHelpers.paginate(page,pageCount);
    officeMgr.getNameOfficeSubconstitVillageMahalla(req.params.oid,req.params.sid,req.params.vid,req.params.mid,function(resultTwo){
      res.render('mahalla', { title: 'المدينة/القرية' , officeid : req.params.oid , subbid  : req.params.sid  , centers : results[0],names:resultTwo,pagination : pagination});
    })
  });
});
/* delete office  */
router.get('/:oid:/deleteoffice/', function(req, res) {
  officeMgr.deloff(req.params.id,function(result){
    res.send(result);
  })
});
/* get sub subconstituency   */
router.get('/getsub/:id', function(req, res) {
  subconstituencyMgr.getsub(req.params.id,function(result){
    res.send(result);
  })
});
/* get village */
router.get('/getvillage/:id', function(req, res) {
  villageMgr.getvillage(req.params.id,function(result){
    res.send(result);
  })
});
module.exports = router;