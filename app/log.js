var mysqlMgr = require('./mysql').mysqlMgr,
    util=require('util');
exports.repoMgr = {
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
  /*report   */
  report : function(limit,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `u`.`name`,`value`, `type`,`table`,`desc`,`l`.`creation_date`,`table_idtable`  FROM `user` u,`log` l WHERE `l`.`user_iduser`=`u`.`iduser` order by idlog desc limit ?,10 ; SELECT COUNT(*) as cnt FROM `user` u,`log` l WHERE `l`.`user_iduser`=`u`.`iduser`;' ,limit, function(err, result) {
        conn.release();
         if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /*add new log*/
  insertLog : function (iduser,type,tabel,desc,idtabel,name){
    mysqlMgr.connect(function (conn) {
      conn.query('INSERT INTO `log` (`user_iduser`,`type`,`table`,`desc`,`table_idtable`,`value`) VALUES(?,?,?,?,?,?)',[iduser,type,tabel,desc,idtabel,name],  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } 
      });
    });  
  }, 
};
