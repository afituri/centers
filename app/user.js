var mysqlMgr = require('./mysql').mysqlMgr,
    util=require('util');
exports.userMgr = {
  /* adding a new user to the system */
  addUser : function(body,cb){
    mysqlMgr.connect(function (conn) {
      var phone = body.phone;
      var type = body.typ
      delete body["phone"];
      delete body["typ"];
      conn.query('INSERT INTO `user` SET ?',  body,  function(err, result) {
        if(err) {
          util.log(err);
        } else {
          var results={
            id:result.insertId,
            name :body.name
          }
          for (var i=0;i<phone.length;i++) {
              conn.query('INSERT INTO `phone` SET user_type = 0, phone_number=?,type=?,user_employee =?',[phone[i],type[i],results.id]);           
              }
        conn.release();

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
      conn.query('SELECT `iduser`,`name`,`phone_number`,`level` FROM user LEFT JOIN phone ON  (phone.user_employee = user.iduser AND phone.user_type = 0 ) WHERE  user.status = 1 group by iduser',  function(err, result) {
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
  /* get all centers */
  getofes : function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `idoffice`,`office_name` FROM `office` WHERE status = 1 ',  function(err, result) {
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
      conn.query('SELECT * FROM `office` WHERE status = 1 ',  function(err, result) {
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
      conn.query('SELECT `iduser`,`name`,`email`,`phone_number`,`level`,`idphone`,`type`,`office_idoffice`,`phone_number` FROM user LEFT JOIN phone ON (phone.user_employee = user.iduser )  RIGHT JOIN office ON (office.idoffice = user.office_idoffice)  WHERE user.status = 1 AND user.iduser = ?', id ,  function(err, result) {
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
        conn.query('UPDATE `phone` SET status = 0 WHERE user_employee = ?',id);
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
      conn.query('SELECT `iduser`,`name`,`office_name`,`phone_number`,`idphone` FROM `user`,`office`,`phone` WHERE office.idoffice = user.office_idoffice AND phone.user_employee = user.iduser AND user.status = 1 AND user.level = 2 group by iduser' ,  function(err, result) {
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
    /* delete office by id*/
  deloff : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('UPDATE `office` SET status = 0 WHERE iduser = ?',id,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
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