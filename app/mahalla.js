var mysqlMgr = require('./mysql').mysqlMgr,
  util=require('util');
exports.mahallaMgr = {
  /* get mahhla   by vellge id*/
  getmahalla : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `mahalla` WHERE `status`= 1 AND `village_idvillage` = ?',id,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /* get all mahhla */
  getMahallas : function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `mahalla` WHERE `status`= 1 ',  function(err, result) {
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