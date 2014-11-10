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
  res.render('subconstitunecy', { title: 'تعديل اللجان  الأنتخابية الفرعيه' });
});


/* GET village page. */
router.get('/:oid:/:sid/:vid', function(req, res) {
  res.render('village', { title: 'المدينة/القرية' });
});


/* GET mahalla page. */
router.get('/:oid/:sid/:vid/:mid', function(req, res) {
  res.render('mahalla', { title: 'المحلة' });
});

/* GET center page. */
router.get('/:oid/:sid/:vid/:mid/:cid', function(req, res) {
  officeMgr.getOffice(function(result){
    res.render('center', { title: "المراكز الأنتخابية " , offices : result});
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