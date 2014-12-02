var mysqlMgr = require('./mysql').mysqlMgr,
  util=require('util');
exports.villageMgr = {
  /* get sub subconstituency  by id*/
  getvillage : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `village` WHERE `status`= 1 AND `subconstituency_idsubconstituency` = ?',id,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /* get all village .*/
  getAllVillage : function(limit,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `village` WHERE `status`= 1 limit ?,10; SELECT COUNT(*) as cnt FROM `village`  WHERE `status` = 1 ;',limit,  function(err, result) {
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