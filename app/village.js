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
};