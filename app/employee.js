var mysqlMgr = require('./mysql').mysqlMgr,
  util=require('util');
exports.employeeMgr = {
  /* get employee fro manager or root or admin */
  getemployees : function(id,level,id_of,cb){
    mysqlMgr.connect(function (conn) {
      if(level == 2 ){
        conn.query('SELECT  `idemployee`,`employee_name`,`e`.`email`,`e`.`type`,`c`.`name`,`phone_number` FROM `employee` e,`centers` c,`phone` p WHERE `p`.`user_employee` = `e`.`idemployee` AND `p`.`user_type` = 1 AND `c`.`idcenter` = `e`.`center_idcenter` AND `e`.`status`= 1 AND `c`.`office_idoffice` =? GROUP BY `idemployee`',id_of,  function(err, result) {
            conn.release();
            if(err) {
              util.log(err);
            } else {
              cb(result);
            } 
                  
        });
      }else{
        conn.query('SELECT  `idemployee`,`employee_name`,`e`.`email`,`e`.`type`,`c`.`name`,`phone_number` FROM `employee` e,`centers` c,`phone` p WHERE `p`.`user_employee` = `e`.`idemployee` AND `p`.`user_type` = 1 AND `c`.`idcenter` = `e`.`center_idcenter` AND `e`.`status`= 1 GROUP BY `idemployee`',  function(err, result) {
          conn.release();
          if(err) {
            util.log(err);
          } else {
            cb(result);
          }
        });
      }     
    });
  },
  deleteemployee : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('UPDATE `employee` SET `status` = 0 WHERE `idemployee` = ?',id,  function(err, result) {
        conn.query('UPDATE `phone` SET `status` = 0 WHERE `user_type`= 1 AND`user_employee` = ?',id);
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        } 
      });
    });
  },
  getemployee : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `idemployee`,`employee_name`,`email`,`type`,`nid`,`account_number`,`bank_name`,`center_idcenter` FROM `employee` WHERE `status`= 1 AND`idemployee` = ?;SELECT `idphone`,`phone_number`,`type` FROM `phone` WHERE `status`= 1 AND `user_type`=1 AND `user_employee` = ?',[id,id],  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        } 
      });
    });
  },
  /* editing employee table field by field */
  editEmployee : function(body,rec,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('UPDATE `employee` SET '+body.name+' = ? WHERE `idemployee` = ?',  [body.value,body.pk],  function(err, result) {
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
      conn.query('SELECT `status` FROM `employee` WHERE `status` = 1 AND`email` = ? ',  email,  function(err, result) {
  /* get employee */
  getEmployee : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `employee` WHERE status = 1 ' ,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  }
};