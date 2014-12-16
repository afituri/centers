var mysqlMgr = require('./mysql').mysqlMgr,
  util=require('util');
var logMgr = require('../app/log').repoMgr;
exports.phoneMgr = {
  /* editing user's phone*/
  editphone : function(body,rec,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('UPDATE `phone` SET `phone_number` = ? WHERE `idphone` = ?',[body.value,body.pk],  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(null,rec); 
        }
      });
    });
  },
  /* get phone by id for employee*/
  getphone : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `email`,`phone_number`,`p`.`type` FROM `phone` p,`employee` WHERE `p`.`status`=1 AND `user_type`=1 AND`user_employee` = ? AND `idemployee`=?',[id,id],  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result); 
        }
      });
    });
  },
  /* get phone by id for User*/
  getphoneUser : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `phone_number`,`type`,`email` FROM `phone` p,`user` u WHERE `p`.`status`=1 AND `user_type`=0 AND `u`.`status`=1 AND`user_employee` = ?  AND `u`.`iduser` = ?',[id,id],  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result); 
        }
      });
    });
  },
  /* get phone by id for manager*/
  getPhoneManager : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `phone_number`,`email`,`p`.`type` FROM `phone` p,`user` u WHERE `p`.`status`=1 AND `u`.`status`=1 AND `u`.`level`=2 AND `user_type`=0 AND `user_employee` = ? AND `u`.`iduser` = ?',[id,id],  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result); 
        }
      });
    });
  },
  deletePhone: function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `phone_number`,`type` FROM `phone` WHERE `idphone` = ?',id,  function(err, result) {
        conn.query('UPDATE `phone` SET `status` = 0 WHERE `idphone` = ?',id);       
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result); 
        }
      });
    });
  },
  addphone: function(id,phone,type,user_id,user_type,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('INSERT INTO `phone` SET `user_type` = ?, `phone_number` = ?,type=?,`user_employee` =?',[user_type,phone,type,user_id], function(err, results) {
        logMgr.insertLog(id,"add","phone","add phone : "+phone,results.insertId,phone);
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(results);
        }
      });  
    });
  },
};