var mysqlMgr = require('./mysql').mysqlMgr,
  util=require('util');
exports.constituencyMgr = {
  /* get sub subconstituency  by id*/
  getConstituency : function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `constituency`  WHERE `status`=1 ',  function(err, result) {
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