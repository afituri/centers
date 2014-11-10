var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var userMgr = require('../app/user').userMgr;
var logMgr = require('../app/log').repoMgr;
var officeMgr = require('../app/office').officeMgr;
var subconstituencyMgr = require('../app/subconstituency').subconstituencyMgr;
var villageMgr = require('../app/village').villageMgr;
var centerMgr = require('../app/center').centerMgr;



/* GET home office  page. */
router.get('/', function(req, res) {
  officeMgr.getOffice(function(result){
    centerMgr.getCenters(function(results){
      res.render('office', { title: "اللجان  الأنتخابية" , offices : result,centers : results});
    })
  });
});

/* get all region name */
router.get('/getofes', function(req, res) {
  officeMgr.getregion(function(result){
    res.send(result);
  })
});

/* GET office by id  page. */
router.get('/:oid', function(req, res) {
  officeMgr.getOffice(function(result){
    centerMgr.getCentersOffice(req.params.oid,function(results){
      res.render('officeManager', { title: "اللجان  الأنتخابية" , offices : result, centers : results});
    })
  })
});

/* GET editsubconstituency page. */
router.get('/:oid/:sid/editsubconstituency', function(req, res) {
  res.render('editsubconstituency', { title: 'تعديل اللجان  الأنتخابية الفرعيه' });
});

/* GET subconstitunecy page. */
router.get('/:oid/:sid', function(req, res) {
  res.render('subconstitunecy', { title: 'تعديل اللجان  الأنتخابية الفرعيه' });
});


/* GET village page. */
router.get('/:oid:/:sid/:vid', function(req, res) {
  res.render('village', { title: 'المدينة/القرية' });
});

/* GET editvillage page. */
router.get('/:oid:/:sid/:vid/editvillage', function(req, res) {
  res.render('editvillage', { title: 'تعديل المدينة/القرية' });
});

/* GET mahalla page. */
router.get('/:oid/:sid/:vid/:mid', function(req, res) {
  res.render('mahalla', { title: 'المحلة' });
});

/* GET editmahalla page. */
router.get('/:oid/:sid/:vid/:mid/editmahalla', function(req, res) {
  res.render('editmahalla', { title: 'تعديل المحلة' });
});

/* GET center page. */
router.get('/:oid/:sid/:vid/:mid/:cid', function(req, res) {
  officeMgr.getOffice(function(result){
    res.render('center', { title: "المراكز الأنتخابية " , offices : result});
  })

});

/* GET editcenter page. */
router.get('/:oid:/:sid:/:vid:/:mid:/:cid/editcenter', function(req, res) {
  res.render('editcenter', { title: 'تعديل المراكز' });
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