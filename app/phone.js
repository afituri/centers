var mysqlMgr = require('./mysql').mysqlMgr,
  util=require('util');
exports.phoneMgr = {
  /* editing user's phone*/
  editphone : function(body,rec,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('UPDATE `phone` SET `phone_number` = ? WHERE `idphone` = ?',  [body.value,body.pk],  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(null,rec); 
        }
      });
    });
  },
};