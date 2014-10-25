var mysqlMgr = require('./mysql').mysqlMgr,
    util=require('util');

exports.userMgr = {
  /* adding a new user to the system */
	addUser : function(body,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('INSERT INTO `user` SET ?',  body,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(body.name); 
        }
      });
    });
  },
  /* check if email exists */
  checkEmail : function(email,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `status` FROM `user` WHERE `email` = ? ',  email,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /* get all users*/
  getUsers : function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `user`',  function(err, result) {
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