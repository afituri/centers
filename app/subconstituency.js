var mysqlMgr = require('./mysql').mysqlMgr,
  util=require('util');
exports.subconstituencyMgr = {
  /* get sub subconstituency  by id*/
  getsub : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `subconstituency`  WHERE `status`=1 AND `office_idoffice` = ?',id,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /* get All subconstituency . */
  getAllSubconstituency : function(limit,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `subconstituency`  WHERE `status`=1 limit ?,10; SELECT COUNT(*) as cnt FROM `subconstituency`  WHERE `status` = 1 ;',limit,  function(err, result) {
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