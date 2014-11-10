var mysqlMgr = require('./mysql').mysqlMgr,
  util=require('util');
exports.centerMgr = {
    /* get center by id*/
  getCenter : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `centers` WHERE `idcenter` = ?',id,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /* get all centers */
  getCenters : function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT  *  FROM `centers` WHERE `status` = 1 ',  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /*get centers by office id */
  getCentersOffice : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT  *  FROM `centers` WHERE `status` = 1 AND `office_idoffice`= '+id,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
   /*get centers by sub id */
  getCentersSub : function(id,cid,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT  *  FROM `centers` WHERE `status` = 1 AND `office_idoffice`='+id+'  AND`subconstituency_idsubconstituency`= '+cid,  function(err, result) {
            console.log("you are in centersub");
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  }
};