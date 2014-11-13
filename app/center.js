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
  getCenters : function(limit,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT  *  FROM `centers` WHERE `status` = 1 limit ?,10; SELECT COUNT(*) as cnt FROM `centers`  WHERE `status` = 1 ;',limit,  function(err, result) {
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
      conn.query('SELECT  *  FROM `centers` WHERE `status` = 1 AND `office_idoffice`= ?', [id] ,function(err, result) {
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
      conn.query('SELECT  *  FROM `centers` WHERE `status` = 1 AND `office_idoffice`= ?  AND`subconstituency_idsubconstituency`= ? ',[id,cid],  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  getCentersvillage : function(id,cid,vid,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT  *  FROM `centers` WHERE `status` = 1 AND `office_idoffice`= ?  AND`subconstituency_idsubconstituency`= ? AND `village_idvillage`= ? ',[id,cid,vid],  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /*Search Centers by id*/
  searchByCenterId : function(id,cb){
    id = id+"%";
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT  *  FROM `centers` WHERE `status` = 1 AND `center_id` LIKE ? ',id,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  getCentersmahlla : function(id,cid,vid,mid,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT  *  FROM `centers` WHERE `status` = 1 AND `office_idoffice`= ?  AND`subconstituency_idsubconstituency`= ? AND `village_idvillage`= ? AND `mahalla_idmahalla`= ? ',[id,cid,vid,mid],  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },

};
