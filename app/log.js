var mysqlMgr = require('./mysql').mysqlMgr,
    util=require('util');

exports.repo = {
 /*report  adding a new user to the system */
  addLog : function(body,id,tabel,idtabel,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT '+body.name+' FROM `'+tabel+'` WHERE `'+idtabel+'` = ?',body.pk, function(err, result) {
        conn.release();
        var key=Object.keys(result[0]);
        var text =body.name+" : "+result[0][key]+" => "+body.value;
        cb(null,text);
      });
    });
 
  },
  /*add new log*/
  insertLog : function (iduser,type,tabel,desc,idtabel){
    mysqlMgr.connect(function (conn) {
      conn.query('INSERT INTO `log` (`user_iduser`,`type`,`table`,`desc`,`table_idtable`) VALUES(?,?,?,?,?)',[iduser,type,tabel,desc,idtabel],  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } 
      });
    });  
  }, 
};
