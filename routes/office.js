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
    centerMgr.getCenters(function(results){
      res.render('office', { title: "اللجان  الأنتخابية" , offices : result,centers : results});
    })
  });
});

/* Search by center id */
router.get('/searchByCenterId/:id', function(req, res) {
  centerMgr.searchByCenterId(req.params.id,function(results){
    res.send(results);
  })
});

/* GET office by id  page. */
router.get('/:oid', function(req, res) {
  subconstituencyMgr.getsub(req.params.oid,function(result){
    centerMgr.getCentersOffice(req.params.oid,function(results){
      res.render('officeManager', { title: "اللجان  الأنتخابية" , sub : result, centers : results});
    })
  })
});

/* GET subconstitunecy page. */
router.get('/:oid/:sid', function(req, res) {
    villageMgr.getvillage(req.params.sid,function(result){
      centerMgr.getCentersSub(req.params.oid,req.params.sid,function(results){
        res.render('subconstituency', { title: ' الدوائر  الأنتخابية الفرعيه' , officeid :req.params.oid , villages : result, centers : results});
           console.log(result);
    })
  })
});
/* GET village page. */
router.get('/:oid/:sid/:vid', function(req, res) {
  console.log("welcome to get village ");
    mahallaMgr.getmahalla(req.params.vid,function(result){
      centerMgr.getCentersvillage(req.params.oid,req.params.sid,req.params.vid,function(results){
        console.log(req.params.vid);
        res.render('village', { title: 'المدينة/القرية' , officeid : req.params.oid , subbid  : req.params.sid , mahallas : result , centers : results});
    })
  })        
});

/* GET mahalla page. */
router.get('/:oid/:sid/:vid/:mid', function(req, res) {
  centerMgr.getCentersmahlla(req.params.oid,req.params.sid,req.params.vid,req.params.mid,function(results){
    res.render('village', { title: 'المدينة/القرية' , officeid : req.params.oid , subbid  : req.params.sid  , centers : results});
  })
});

/* delete office  */
router.get('/:oid:/deleteoffice/', function(req, res) {
  console.log("you are in officee.root")
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