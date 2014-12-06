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
        res.render('office', { title: "اللجان  الأنتخابية",name:req.session.name , offices : result,centers : results[0],pagination : pagination,level:req.session.level});
      }else{
        res.render('office', { title: "اللجان  الأنتخابية" ,name:req.session.name, offices : result,centers : res,pagination : null,level:req.session.level});
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
router.get('/centerViews',userHelpers.isAdmin,function(req, res) {
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
router.get('/subconstituencyViews',userHelpers.isAdmin,function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  subconstituencyMgr.getAllSubconstituency(limit,function(results){
    if(results[1][0] != undefined){
      var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
      var pagination = userHelpers.paginate(page,pageCount);
      res.render('subconstituencyViews', { title: "الدوائر الفرعيه" ,name:req.session.name, subconstituencys : results[0],pagination : pagination,level:req.session.level});
    }else{
      res.render('subconstituencyViews', { title: "الدوائر الفرعيه" ,name:req.session.name, subconstituencys : res,pagination : null,level:req.session.level});
    }
  })
});
/* GET mahallaViews. */
router.get('/mahallaViews',userHelpers.isAdmin,function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  mahallaMgr.getAllMahalla(limit,function(results){
    if(results[1][0] != undefined){
      var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
      var pagination = userHelpers.paginate(page,pageCount);
      res.render('mahallaViews', { title: "المحلة",name:req.session.name , mahallas : results[0],pagination : pagination,level:req.session.level});
    }else{
      res.render('mahallaViews', { title: "المحلة" ,name:req.session.name, mahallas : res,pagination : null,level:req.session.level});
    }
  })
});
/* GET villageViews. */
router.get('/villageViews',userHelpers.isAdmin,function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  villageMgr.getAllVillage(limit,function(results){
    if(results[1][0] != undefined){
      var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
      var pagination = userHelpers.paginate(page,pageCount);
      res.render('villageViews', { title: "القرية او المدينة" ,name:req.session.name, villages : results[0],pagination : pagination,level:req.session.level});
    }else{
      res.render('villageViews', { title: "القرية او المدينة" ,name:req.session.name, villages : res,pagination : null,level:req.session.level});
    }
  })
});
/* GET officeViews. */
router.get('/officeViews',userHelpers.isAdmin,function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  officeMgr.getAllOffice(limit,function(results){
    if(results[1][0] != undefined){
      var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
      var pagination = userHelpers.paginate(page,pageCount);
      res.render('officeViews', { title: "اللجان" ,name:req.session.name, offices : results[0],pagination : pagination,level:req.session.level});
    }else{
      res.render('officeViews', { title: "اللجان" ,name:req.session.name, offices : res,pagination : null,level:req.session.level});
    }
  })
});
/* GET cons. */
router.get('/constituencyViews',userHelpers.isAdmin,function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  constituencyMgr.getAllConstituency(limit,function(results){
    if(results[1][0] != undefined){
      var pageCount = userHelpers.getPageCount(results[1][0].cnt); //cnt is the total count of records
      var pagination = userHelpers.paginate(page,pageCount);
      res.render('constituencyViews', { title: "الدوائر الرئيسيه" ,name:req.session.name, constituencys : results[0],pagination : pagination,level:req.session.level});
    }else{
      res.render('constituencyViews', { title: "الدوائر الرئيسيه" ,name:req.session.name, constituencys : res,pagination : null,level:req.session.level});
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
          res.render('officeManager', { title: "اللجان  الأنتخابية" ,name:req.session.name, sub : result, centers : results[0], names : resultNames,pagination : pagination,level : req.session.level});
        })
      }else{
        officeMgr.getNameOffice(req.params.oid,function(resultNames){
          res.render('officeManager', { title: "اللجان  الأنتخابية" ,name:req.session.name, sub : result, centers : res, names : resultNames,pagination : null,level : req.session.level});
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
          res.render('subconstituency', { title: ' الدوائر  الأنتخابية الفرعيه',name:req.session.name , officeid :req.params.oid , villages : result, centers : results[0], names : resultOne ,pagination : pagination,level:req.session.level});
        })  
      }else{
        officeMgr.getNameOfficeSubconstit(req.params.oid,req.params.sid,function(resultOne){
          res.render('subconstituency', { title: ' الدوائر  الأنتخابية الفرعيه',name:req.session.name , officeid :req.params.oid , villages : result, centers : res, names : resultOne ,pagination : null,level:req.session.level});
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
          res.render('village', { title: 'المدينة/القرية',name:req.session.name , officeid : req.params.oid , subbid  : req.params.sid , mahallas : result , centers : results[0], names : resultNames,pagination : pagination,level:req.session.level});
        }) 
      }else{
        officeMgr.getNameOfficeSubconstitVillage(req.params.oid,req.params.sid,req.params.vid,function(resultNames){
          res.render('village', { title: 'المدينة/القرية',name:req.session.name , officeid : req.params.oid , subbid  : req.params.sid , mahallas : result , centers : res, names : resultNames,pagination : null,level:req.session.level});
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
        res.render('mahalla', { title: 'المدينة/القرية',name:req.session.name , officeid : req.params.oid , subbid  : req.params.sid  , centers : results[0],names:resultTwo,pagination : pagination,level:req.session.level});
      })
    }else{
      officeMgr.getNameOfficeSubconstitVillageMahalla(req.params.oid,req.params.sid,req.params.vid,req.params.mid,function(resultTwo){
        res.render('mahalla', { title: 'المدينة/القرية' ,name:req.session.name, officeid : req.params.oid , subbid  : req.params.sid  , centers : res,names:resultTwo,pagination : null,level:req.session.level});
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