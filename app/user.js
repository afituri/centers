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
          var results={
            id:result.insertId,
            name :body.name
          }
          cb(results); 
        }
      });
    });
  },
  /* editing user's table field by field */
  editUser : function(body,rec,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('UPDATE `user` SET '+body.name+' = ? WHERE `iduser` = ?',  [body.value,body.pk],  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(null,rec); 
        }
      });
    });
  },
  /* check if email exists */
  checkEmail : function(email,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `status` FROM `user` WHERE status = 1 AND`email` = ? ',  email,  function(err, result) {
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
      conn.query('SELECT * FROM `user` WHERE status = 1 ',  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /* get all centers */
  getCenters : function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `centers` WHERE status = 1 ',  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
    /* get all office */
  getOffice : function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `office_name`,`idoffice` FROM `office` ',  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /* get user by id*/
  getUser : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `iduser`,`name`,`email`,`level`,`phone` FROM `user` WHERE iduser = ?',id,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
    /* get center by id*/
  getCenter : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `centers` WHERE idcenter = ?',id,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
    /* delete user by id*/
  delUser : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('UPDATE `user` SET status = 0 WHERE iduser = ?',id,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
    /* get Manager*/
  getManager : function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `iduser`,`name`,`email`,`level`,`phone`,`office_name` FROM `user`,`office` WHERE office.idoffice = user.office_idoffice AND user.status = 1 AND user.level = ?', 2 ,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },/*
  /* getting user by email */
  getUserByEmail : function(email,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `user` WHERE email = ?',email,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result[0]);
        }
      });
    });
  },
  /* getting user by ID */
  getUserById : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `user` WHERE iduser = ?',id,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result[0]);
        }
      });
    });
  }
};