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

/* GET home page. */
router.get('/', function(req, res) {
    res.render('pageViews',{title: 'pageViews'});
});

/* GET center page. */
router.get('/centerViews', function(req, res) {
  centerMgr.getCenters(function(result){
    res.render('centerViews', { title: "المراكز" , centers : result});
  })
});
/* GET center page. */
router.get('/mahallaViews', function(req, res) {
  mahallaMgr.getMahallas(function(result){
    res.render('mahallaViews', { title: "المحلة " , mahallas : result});
  })
});
/* GET center page. */
router.get('/villageViews', function(req, res) {
  officeMgr.getOffice(function(result){
    res.render('villageViews', { title: "القرية/المدينة " , villages : result});
  })
});
/* GET center page. */
router.get('/subconstituencyViews', function(req, res) {
  officeMgr.getOffice(function(result){
    res.render('subconstituencyViews', { title: "الدوائر الفرعيه " , subconstituency : result});
  })
});
/* GET center page. */
router.get('/officeViews', function(req, res) {
  officeMgr.getOffice(function(result){
    res.render('officeViews', { title: "اللجان " , offices : result});
  })
});