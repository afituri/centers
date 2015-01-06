var mysqlMgr = require('./mysql').mysqlMgr,
    util=require('util');
exports.userMgr = {
  /* adding a new user to the system */
  addUser : function(body,cb){
    mysqlMgr.connect(function (conn) {
      var phone = body.phone;
      var type = body.phone_type;
      var p_type = body.p_type;
      delete body["phone"];
      delete body["phone_type"];
      delete body["p_type"];
      conn.query('INSERT INTO `user` SET ?',  body,  function(err, result) {
        if(err) {
          util.log(err);
        } else {
          var results={
            id:result.insertId,
            name :body.name
          }
          for (var i=0;i<phone.length;i++) {
              conn.query('INSERT INTO `phone` SET `user_type` = 0, `phone_number` = ?,type=?,`user_employee` =?,`p_type` =?',[phone[i],type[i],results.id,p_type[i]]);           
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
      var date = new Date();
      conn.query('UPDATE `user` SET '+body.name+' = ?,`modify_date`=? WHERE `iduser` = ?',  [body.value,date,body.pk],  function(err, result) {
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
      conn.query('SELECT `iduser`,`name`,`phone_number`,`level` FROM user LEFT JOIN phone ON  (phone.user_employee = user.iduser AND phone.user_type = 0 AND phone.status=1) WHERE  user.status = 1 group by iduser limit ?,10; SELECT COUNT(*) as cnt FROM `user`  WHERE `status` = 1;', limit,  function(err, result) {
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
      conn.query('SELECT `iduser`,`name`,`email`,`phone_number`,`level`,`idphone`,`p_type`,`type`,`office_idoffice`,`phone_number` FROM user LEFT JOIN  office ON (office.idoffice = user.office_idoffice AND office.status=1) LEFT JOIN phone ON(phone.user_employee = user.iduser AND phone.status = 1 AND phone.user_type =0) WHERE  user.iduser = ? AND user.status = 1', id ,  function(err, result) {
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
      var date = new Date();
      conn.query('UPDATE `user` SET `status` = 0 ,`modify_date`=? WHERE `iduser` = ?',[date,id],  function(err, result) { 
        conn.query('SELECT `idphone`,`phone_number` FROM  `phone` WHERE `status` = 1  AND `user_type`=0 AND `user_employee`=?',id,  function(err, results) {
          conn.query('SELECT `name` FROM  `user` WHERE `iduser` = ? ',id,  function(err, resultz) {
            conn.query('UPDATE `phone` SET `status` = 0,`modify_date`=? WHERE `user_employee` = ?',[id,date]);
            conn.release();
            if(err) {
            util.log(err);
            } else {
              cb(results,resultz);
            }
          });
        });
      });
    });
  },
    /* get Manager*/
  getManager : function(limit,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `iduser`,`name`,`phone_number`,`level` ,`office_name_ar` FROM office , user LEFT JOIN phone ON  (phone.user_employee = user.iduser AND phone.user_type = 0 AND phone.status=1) WHERE idoffice = office_idoffice AND user.status = 1 AND user.level=2 group by iduser limit ?,10; SELECT COUNT(*) as cnt FROM `user`  WHERE `status` = 1 AND level=2;', limit,function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /* search manager by name_ar  */
  searchManager:function(name,cb){
    name=name+"%";
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `iduser`,`name`,`office_name_ar`,`phone_number`,`level`,`idphone`,`type`,`office_idoffice`,`email` FROM user LEFT JOIN  office ON (office.idoffice = user.office_idoffice AND office.status=1) LEFT JOIN phone ON(phone.user_employee = user.iduser AND phone.status = 1 AND phone.user_type =0) WHERE  user.name LIKE ? AND user.status = 1 AND user.level=2  group by iduser', name ,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /* search user by name  */
  searchUser:function(name,cb){
    name=name+"%";
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `iduser`,`name`,`email`,`phone_number`,`level`,`idphone`,`type`,`office_idoffice`,`phone_number` FROM user LEFT JOIN  office ON (office.idoffice = user.office_idoffice AND office.status=1) LEFT JOIN phone ON(phone.user_employee = user.iduser AND phone.status = 1 AND phone.user_type =0) WHERE  user.name LIKE ? AND user.status = 1 group by iduser', name ,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /* getting user by email */
  getUserByEmail : function(email,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `user` WHERE `status` = 1 AND `email` = ?',email,  function(err, result) {
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
      conn.query('SELECT * FROM `user` WHERE `status` = 1 AND `iduser` = ?',id,  function(err, result) {
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