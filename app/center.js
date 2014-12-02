var mysqlMgr = require('./mysql').mysqlMgr,
  util=require('util');
exports.centerMgr = {
  /* get center by id*/
  getCenter : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `center_id`,`name`,`center_type`,`constituency_name_ar`,`mahalla_name`,`office_name_ar`,`subconstituency_name_ar`,`village_name` FROM `centers` ce,`constituency` c,`mahalla` m,`office` o,`subconstituency` s,`village` v WHERE `ce`.`center_id` = ? AND `ce`.`status`=1 AND `ce`.`office_idoffice`=`o`.`office_id` AND `ce`.`constituency_idconstituency`= `c`.`constituency_id` AND  `ce`.`subconstituency_idsubconstituency`= `s`.`subconstituency_id` AND `ce`.`mahalla_idmahalla`= `m`.`idmahalla` AND `ce`.`village_idvillage`= `v`.`idvillage`   ',id,  function(err, result) {
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
  /* get all centers for select */
  getCentersSelect : function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT  *  FROM `centers` WHERE `status` = 1',  function(err, result) {
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
  getCentersOffice : function(limit,id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT  *  FROM `centers` WHERE `status` = 1 AND `office_idoffice`= ? limit ?,10; SELECT COUNT(*) as cnt FROM `centers`  WHERE `status` = 1 AND `office_idoffice`= ?; ',[id,limit,id] ,function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
   /*get centers by sub id for select */
  getCentersS : function(id,cid,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT  *  FROM `centers` WHERE `status` = 1 AND `office_idoffice`= ?  AND`subconstituency_idsubconstituency`= ?',[id,cid],  function(err, result) {
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
  getCentersSub : function(limit,id,cid,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT  *  FROM `centers` WHERE `status` = 1 AND `office_idoffice`= ?  AND`subconstituency_idsubconstituency`= ? limit ?,10; SELECT COUNT(*) as cnt FROM `centers` WHERE `status` = 1 AND `office_idoffice`= ?  AND`subconstituency_idsubconstituency`= ? ',[id,cid,limit,id,cid],  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /*Search getCentersvillage .*/
  getCentersvillage : function(limit,id,cid,vid,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT  *  FROM `centers` WHERE `status` = 1 AND `office_idoffice`= ?  AND`subconstituency_idsubconstituency`= ? AND `village_idvillage`= ? limit ?,10; SELECT COUNT(*) as cnt FROM `centers` WHERE `status` = 1 AND `office_idoffice`= ?  AND`subconstituency_idsubconstituency`= ? AND `village_idvillage`= ? ; ',[id,cid,vid,limit,id,cid,vid],  function(err, result) {
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
  searchByCenterId : function(id,level,ido,cb){
    id = id+"%";
    mysqlMgr.connect(function (conn) {
      if(level<2){
        conn.query('SELECT  *  FROM `centers` WHERE `status` = 1 AND `center_id` LIKE ? ',id,  function(err, result) {
          conn.release();
          if(err) {
            util.log(err);
          } else {
            cb(result);
          }
        });
      }else{
        conn.query('SELECT  *  FROM `centers` WHERE `status` = 1 AND `office_idoffice`=? AND `center_id` LIKE ? ',[ido,id],  function(err, result) {
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
  /*check center in the offise .*/
  iscenter: function(cid,id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `idcenter`  FROM `centers` WHERE `status` = 1 AND `center_id`=? AND `office_idoffice`= ?',[cid,id],  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          if(result[0]){
            cb(true);
          }else{
            cb(false);
          }
        }
      });
    });
  },
  /*Search getCentersmahlla .*/
  getCentersmahlla : function(limit,id,cid,vid,mid,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT  *  FROM `centers` WHERE `status` = 1 AND `office_idoffice`= ?  AND`subconstituency_idsubconstituency`= ? AND `village_idvillage`= ? AND `mahalla_idmahalla`= ? limit ?,10; SELECT COUNT(*) as cnt FROM `centers` WHERE `status` = 1 AND `office_idoffice`= ?  AND`subconstituency_idsubconstituency`= ? AND `village_idvillage`= ? AND `mahalla_idmahalla`= ?;',[id,cid,vid,mid,limit,id,cid,vid,mid],  function(err, result) {
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
