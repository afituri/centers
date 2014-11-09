var mysqlMgr = require('./mysql').mysqlMgr,
  util=require('util');
exports.subconstituencyMgr = {
  /* get sub subconstituency  by id*/
  getsub : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `subconstituency` WHERE office_idoffice = ?',id,  function(err, result) {
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