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
var res =[];
/* GET home office  page. */
router.get('/',userHelpers.isAdmin, function(req, res) {
  req.session.back = req.originalUrl;
  officeMgr.getOffice(function(result){
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
    centerMgr.getCenters(limit,function(results){
      if(results[1][0] != undefined){
        var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
        var pagination = userHelpers.paginate(page,pageCount);
        res.render('office', { title: "اللجان  الأنتخابية" , offices : result,centers : results[0],pagination : pagination});
      }else{
        res.render('office', { title: "اللجان  الأنتخابية" , offices : result,centers : res,pagination : null});
      }
    })
  });
});
/* search Mahalla by name */
router.get('/searchMahalla/:id', function(req, res) {
  mahallaMgr.searchMahalla(req.params.id,function(result){
    res.send(result);
  })
});
/* searchByCenterId office  */
router.get('/searchByCenterId/:id', function(req, res) {
  centerMgr.searchByCenterId(req.params.id,req.session.level,req.session.office_idoffice,function(result){
    res.send(result);
  });
});
/* search subconstituency by name_ar  */
router.get('/searchSubconstituency/:id', function(req, res) {
  subconstituencyMgr.searchSubconstituency(req.params.id,function(result){
    res.send(result);
  });
});
/* search village by name_ar  */
router.get('/searchVillage/:id', function(req, res) {
  villageMgr.searchvillage(req.params.id,function(result){
    res.send(result);
  });
});

/* GET centers. */
router.get('/centerViews', function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  centerMgr.getCenters(limit,function(results){
    if(results[1][0] != undefined){
        var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
        var pagination = userHelpers.paginate(page,pageCount);
      res.render('centerViews', { title: "المراكز" , centers : results[0],pagination : pagination});
    }else{
      res.render('centerViews', { title: "المراكز" , centers : res,pagination : null});
    }
  })
});
/* GET subconstituencyViews. */
router.get('/subconstituencyViews', function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  subconstituencyMgr.getAllSubconstituency(limit,function(results){
    if(results[1][0] != undefined){
      var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
      var pagination = userHelpers.paginate(page,pageCount);
      res.render('subconstituencyViews', { title: "الدوائر الفرعيه" , subconstituencys : results[0],pagination : pagination});
    }else{
      res.render('subconstituencyViews', { title: "الدوائر الفرعيه" , subconstituencys : res,pagination : null});
    }
  })
});
/* GET mahallaViews. */
router.get('/mahallaViews', function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  mahallaMgr.getAllMahalla(limit,function(results){
    if(results[1][0] != undefined){
      var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
      var pagination = userHelpers.paginate(page,pageCount);
      res.render('mahallaViews', { title: "المحلة" , mahallas : results[0],pagination : pagination});
    }else{
      res.render('mahallaViews', { title: "المحلة" , mahallas : res,pagination : null});
    }
  })
});
/* GET villageViews. */
router.get('/villageViews', function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  villageMgr.getAllVillage(limit,function(results){
    if(results[1][0] != undefined){
      var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
      var pagination = userHelpers.paginate(page,pageCount);
      res.render('villageViews', { title: "القرية او المدينة" , villages : results[0],pagination : pagination});
    }else{
      res.render('villageViews', { title: "القرية او المدينة" , villages : res,pagination : null});
    }
  })
});
/* GET officeViews. */
router.get('/officeViews', function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  officeMgr.getAllOffice(limit,function(results){
    if(results[1][0] != undefined){
      var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
      var pagination = userHelpers.paginate(page,pageCount);
      res.render('officeViews', { title: "اللجان" , offices : results[0],pagination : pagination});
    }else{
      res.render('officeViews', { title: "اللجان" , offices : res,pagination : null});
    }
  })
});
/* GET cons. */
router.get('/constituencyViews', function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  constituencyMgr.getAllConstituency(limit,function(results){
    if(results[1][0] != undefined){
      var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
      var pagination = userHelpers.paginate(page,pageCount);
      res.render('constituencyViews', { title: "الدوائر الرئيسيه" , constituencys : results[0],pagination : pagination});
    }else{
      res.render('constituencyViews', { title: "الدوائر الرئيسيه" , constituencys : res,pagination : null});
    }
  })
});
/* GET office by id  page. */
router.get('/:oid',userHelpers.isManager, function(req, res) {
  req.session.back = req.originalUrl;
  subconstituencyMgr.getsub(req.params.oid,function(result){
    var page = userHelpers.getPage(req);
    var limit = userHelpers.getLimit(page);
    centerMgr.getCentersOffice(limit,req.params.oid,function(results){
      if(results[1][0] != undefined){
        var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
        var pagination = userHelpers.paginate(page,pageCount);
        officeMgr.getNameOffice(req.params.oid,function(resultNames){
          res.render('officeManager', { title: "اللجان  الأنتخابية" , sub : result, centers : results[0], names : resultNames,pagination : pagination,level : req.session.level});
        })
      }else{
        officeMgr.getNameOffice(req.params.oid,function(resultNames){
          res.render('officeManager', { title: "اللجان  الأنتخابية" , sub : result, centers : res, names : resultNames,pagination : null,level : req.session.level});
        })
      }
    })
  })
});
/* GET subconstitunecy page. */
router.get('/:oid/:sid',userHelpers.isManager, function(req, res) {
  req.session.back = req.originalUrl;
  villageMgr.getvillage(req.params.sid,function(result){
    var page = userHelpers.getPage(req);
    var limit = userHelpers.getLimit(page);
    centerMgr.getCentersSub(limit,req.params.oid,req.params.sid,function(results){
      if(results[1][0] != undefined){
        var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
        var pagination = userHelpers.paginate(page,pageCount);
        officeMgr.getNameOfficeSubconstit(req.params.oid,req.params.sid,function(resultOne){
          res.render('subconstituency', { title: ' الدوائر  الأنتخابية الفرعيه' , officeid :req.params.oid , villages : result, centers : results[0], names : resultOne ,pagination : pagination});
        })  
      }else{
        officeMgr.getNameOfficeSubconstit(req.params.oid,req.params.sid,function(resultOne){
          res.render('subconstituency', { title: ' الدوائر  الأنتخابية الفرعيه' , officeid :req.params.oid , villages : result, centers : res, names : resultOne ,pagination : null});
        })  
      }    
    })
  })
});
/* GET village page. */
router.get('/:oid/:sid/:vid',userHelpers.isManager, function(req, res) {
  req.session.back = req.originalUrl;
  mahallaMgr.getmahalla(req.params.vid,function(result){
    var page = userHelpers.getPage(req);
    var limit = userHelpers.getLimit(page);
    centerMgr.getCentersvillage(limit,req.params.oid,req.params.sid,req.params.vid,function(results){
      if(results[1][0] != undefined){
        var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
        var pagination = userHelpers.paginate(page,pageCount);
        officeMgr.getNameOfficeSubconstitVillage(req.params.oid,req.params.sid,req.params.vid,function(resultNames){
          res.render('village', { title: 'المدينة/القرية' , officeid : req.params.oid , subbid  : req.params.sid , mahallas : result , centers : results[0], names : resultNames,pagination : pagination});
        }) 
      }else{
        officeMgr.getNameOfficeSubconstitVillage(req.params.oid,req.params.sid,req.params.vid,function(resultNames){
          res.render('village', { title: 'المدينة/القرية' , officeid : req.params.oid , subbid  : req.params.sid , mahallas : result , centers : res, names : resultNames,pagination : null});
        }) 
      } 
    })
  })        
});
/* GET mahalla page. */
router.get('/:oid/:sid/:vid/:mid', userHelpers.isManager,function(req, res) {
  req.session.back = req.originalUrl;
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  centerMgr.getCentersmahlla(limit,req.params.oid,req.params.sid,req.params.vid,req.params.mid,function(results){
    if(results[1][0] != undefined){
      var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
      var pagination = userHelpers.paginate(page,pageCount);
      officeMgr.getNameOfficeSubconstitVillageMahalla(req.params.oid,req.params.sid,req.params.vid,req.params.mid,function(resultTwo){
        res.render('mahalla', { title: 'المدينة/القرية' , officeid : req.params.oid , subbid  : req.params.sid  , centers : results[0],names:resultTwo,pagination : pagination});
      })
    }else{
      officeMgr.getNameOfficeSubconstitVillageMahalla(req.params.oid,req.params.sid,req.params.vid,req.params.mid,function(resultTwo){
        res.render('mahalla', { title: 'المدينة/القرية' , officeid : req.params.oid , subbid  : req.params.sid  , centers : res,names:resultTwo,pagination : null});
      })
    }
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