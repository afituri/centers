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
var constituencyMgr = require('../app/constituency').constituencyMgr;

/* GET home office  page. */
router.get('/',userHelpers.isAdmin, function(req, res) {
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

/* searchByCenterId office  */
router.get('/searchByCenterId/:id', function(req, res) {
  centerMgr.searchByCenterId(req.params.id,req.session.level,req.session.office_idoffice,function(result){
    res.send(result);
  });
});

/* GET centers. */
router.get('/centerViews', function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  centerMgr.getCenters(limit,function(results){
    var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
    var pagination = userHelpers.paginate(page,pageCount);
    res.render('centerViews', { title: "المراكز" , centers : results[0],pagination : pagination});
  })
});
/* GET subconstituencyViews. */
router.get('/subconstituencyViews', function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  subconstituencyMgr.getAllSubconstituency(limit,function(results){
    var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
    var pagination = userHelpers.paginate(page,pageCount);
    res.render('subconstituencyViews', { title: "الدوائر الفرعيه" , subconstituencys : results[0],pagination : pagination});
  })
});
/* GET mahallaViews. */
router.get('/mahallaViews', function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  mahallaMgr.getAllMahalla(limit,function(results){
    var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
    var pagination = userHelpers.paginate(page,pageCount);
    res.render('mahallaViews', { title: "المحلة" , mahallas : results[0],pagination : pagination});
  })
});
/* GET villageViews. */
router.get('/villageViews', function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  villageMgr.getAllVillage(limit,function(results){
    var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
    var pagination = userHelpers.paginate(page,pageCount);
    res.render('villageViews', { title: "القرية او المدينة" , villages : results[0],pagination : pagination});
  })
});
/* GET officeViews. */
router.get('/officeViews', function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  officeMgr.getAllOffice(limit,function(results){
    var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
    var pagination = userHelpers.paginate(page,pageCount);
    res.render('officeViews', { title: "اللجان" , offices : results[0],pagination : pagination});
  })
});
/* GET cons. */
router.get('/constituencyViews', function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  constituencyMgr.getAllConstituency(limit,function(results){
    var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
    var pagination = userHelpers.paginate(page,pageCount);
    res.render('constituencyViews', { title: "الدوائر الرئيسيه" , constituencys : results[0],pagination : pagination});
  })
});
/* GET office by id  page. */
router.get('/:oid',userHelpers.isManager, function(req, res) {
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
router.get('/:oid/:sid',userHelpers.isManager, function(req, res) {
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
router.get('/:oid/:sid/:vid',userHelpers.isManager, function(req, res) {
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
router.get('/:oid/:sid/:vid/:mid', userHelpers.isManager,function(req, res) {
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