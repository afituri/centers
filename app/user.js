var mysqlMgr = require('./mysql').mysqlMgr,
    util=require('util');
exports.userMgr = {
  /* adding a new user to the system */
  addUser : function(body,cb){
    mysqlMgr.connect(function (conn) {
      var phone = body.phone;
      var type = body.phone_type
      delete body["phone"];
      delete body["phone_type"];
      conn.query('INSERT INTO `user` SET ?',  body,  function(err, result) {
        if(err) {
          util.log(err);
        } else {
          var results={
            id:result.insertId,
            name :body.name
          }
          for (var i=0;i<phone.length;i++) {
              conn.query('INSERT INTO `phone` SET `user_type` = 0, `phone_number` = ?,type=?,`user_employee` =?',[phone[i],type[i],results.id]);           
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
  /* check if email exists */
  checkEmail : function(email,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `status` FROM `user` WHERE `status` = 1 AND`email` = ? ',  email,  function(err, result) {
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
  getUsers : function(limit,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `iduser`,`name`,`phone_number`,`level` FROM user LEFT JOIN phone ON  (phone.user_employee = user.iduser AND phone.user_type = 0 ) WHERE  user.status = 1 group by iduser limit ?,10; SELECT COUNT(*) as cnt FROM `user`  WHERE `status` = 1;', limit,  function(err, result) {
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
      conn.query('SELECT `iduser`,`name`,`email`,`phone_number`,`level`,`idphone`,`type`,`office_idoffice`,`phone_number` FROM phone,user LEFT JOIN  office ON (office.idoffice = user.office_idoffice AND office.status=1)  WHERE phone.user_employee = user.iduser AND user.status = 1 AND phone.status = 1 AND user.iduser = ?', id ,  function(err, result) {
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
      conn.query('UPDATE `user` SET `status` = 0 WHERE `iduser` = ?',id,  function(err, result) {
        conn.query('UPDATE `phone` SET `status` = 0 WHERE `user_employee` = ?',id);
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
  getManager : function(limit,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `iduser`,`name`,`office_name`,`phone_number`,`idphone`,`type` FROM `user`,`office`,`phone` WHERE `office`.`idoffice` = `user`.`office_idoffice` AND `phone`.`user_employee` = `user`.`iduser` AND `user`.`status` = 1 AND `user`.`level` = 2 group by `iduser`limit ?,10; SELECT COUNT(*) as cnt FROM `user`  WHERE `status` = 1 AND `level` = 2;', limit,function(err, result) {
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
      conn.query('SELECT * FROM `user` WHERE `email` = ?',email,  function(err, result) {
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
      conn.query('SELECT * FROM `user` WHERE `iduser` = ?',id,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result[0]);
        }
      });
    });
  }, 
};