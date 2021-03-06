var mysqlMgr = require('./mysql').mysqlMgr,
  util=require('util');
exports.officeMgr = {
   /* delete office by id*/
  deloff : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('UPDATE `office` SET `status` = 0 WHERE `iduser` = ?',id,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /* get all office */
  getOffice : function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `office` WHERE `status` = 1 AND `idoffice` > 0 ',  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /* get getNameOffice for Breadcrub */
  getNameOffice : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `office_name_ar`,`idoffice` FROM `office` WHERE `status` = 1 AND idoffice = ? ', id,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /* get getNameOfficeSubconstit for Breadcrub  */
  getNameOfficeSubconstit : function(ido,ids,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `office_name_ar`,`subconstituency_name_ar`,`subconstituency_id`,`idoffice` FROM `office`,`subconstituency` WHERE `subconstituency`.`status` = 1 AND `office`.`status` = 1 AND idoffice = ? AND subconstituency_id = ?',[ido,ids], function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /* get getNameOfficeSubconstitVillage for Breadcrub  */
  getNameOfficeSubconstitVillage : function(ido,ids,idv,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `office_name_ar`,`subconstituency_name_ar`,`village_name`,`idvillage`,`subconstituency_id`,`idoffice` FROM `office`,`subconstituency`,`village` WHERE `subconstituency`.`status` = 1 AND `office`.`status` = 1 AND `village`.`status` = 1 AND idoffice = ? AND subconstituency_id = ? AND idvillage = ?',[ido,ids,idv], function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /* get all office .*/
  getAllOffice : function(limit,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `office` WHERE `status`= 1 limit ?,10; SELECT COUNT(*) as cnt FROM `office`  WHERE `status` = 1 ;',limit,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /* get getNameOfficeSubconstitVillageMahalla for Breadcrub  */
  getNameOfficeSubconstitVillageMahalla : function(ido,ids,idv,idm,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `office_name_ar`,`subconstituency_name_ar`,`village_name`,`idvillage`,`subconstituency_id`,`idoffice`,`idmahalla`,`mahalla_name` FROM `office`,`subconstituency`,`village`,`mahalla` WHERE `subconstituency`.`status` = 1 AND `office`.`status` = 1 AND `village`.`status` = 1 AND `mahalla`.`status` = 1 AND idoffice = ? AND subconstituency_id = ? AND idvillage = ? AND idmahalla = ?',[ido,ids,idv,idm], function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /* get office by id */
  getOfficeId : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `office` WHERE status = 1 AND idoffice = ? ', id ,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /* get all region */
  getregion : function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `idoffice`,`region_name` FROM `office` WHERE status = 1 ',  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /* get office for admin or manager */
  getOfficeManager : function(level,office,cb){
    mysqlMgr.connect(function (conn) {
      if(level == 2){
        conn.query('SELECT * FROM `office` WHERE status = 1 AND idoffice = ? ', office ,  function(err, result) {
          conn.release();
          if(err) {
            util.log(err);
          } else {
            cb(result);
          }
        });
      }else{
        conn.query('SELECT * FROM `office` WHERE status = 1',function(err, result) {
          conn.release();
          if(err) {
            util.log(err);
          } else {
            cb(result);
          }
        });
      }
    });
  },
};