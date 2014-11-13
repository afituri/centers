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
      conn.query('SELECT * FROM `office` WHERE `status` = 1 ',  function(err, result) {
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
      conn.query('SELECT `office_name` FROM `office` WHERE `status` = 1 AND idoffice = ? ', id,  function(err, result) {
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
      conn.query('SELECT `office_name`,`subconstituency_name` FROM `office`,`subconstituency` WHERE `subconstituency`.`status` = 1 AND `office`.`status` = 1 AND idoffice = ? AND idsubconstituency = ?',[ido,ids], function(err, result) {
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