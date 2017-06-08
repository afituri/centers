var mysqlMgr = require('./mysql').mysqlMgr,
  util=require('util');
exports.employeeMgr = {
  /* get employee fro manager or root or admin */
  getemployees : function(limit,id,level,id_of,cb){
    mysqlMgr.connect(function (conn) {
      if(level == 2 ){
        conn.query('SELECT  `idemployee`,`employee_name`,`e`.`email`,`e`.`type`,`c`.`name`,`phone_number` FROM `centers` c,`employee` e LEFT JOIN`phone` p  ON (`p`.`user_employee` = `e`.`idemployee` AND `p`.`user_type` = 1 AND `p`.`status`=1) WHERE  `c`.`center_id` = `e`.`center_idcenter` AND `e`.`status`= 1 AND `c`.`office_idoffice` =? AND `c`.`status`=1 GROUP BY `idemployee`limit ?,10; SELECT COUNT(*) as cnt FROM `centers` c,`employee` e  WHERE  `c`.`center_id` = `e`.`center_idcenter` AND `e`.`status`= 1 AND `c`.`office_idoffice` =? AND `c`.`status`=1;',[id_of,limit,id_of],  function(err, result) {
            conn.release();
            if(err) {
              util.log(err);
            } else {
              cb(result);
            }
        });
      }else{
        conn.query('SELECT `idemployee`,`employee_name`,`e`.`email`,`e`.`type`,`c`.`name` FROM `centers` c, `employee` e  WHERE `c`.`center_id` = `e`.`center_idcenter` AND `e`.`status`= 1 AND `c`.`status`=1 limit ?,10; SELECT COUNT(`idemployee`) as cnt FROM `employee` WHERE `status`=1 ;',limit, function(err, result) {
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
  /* Delete employee */
  deleteemployee : function(id,cb){
    mysqlMgr.connect(function (conn) {
      var date = new Date();
      conn.query('UPDATE `employee` SET `status` = 0 ,`modify_date`=? WHERE `idemployee` = ?',[date,id],  function(err, result) {
        conn.query('SELECT `idphone`,`phone_number` FROM  `phone` WHERE `status` = 1  AND `user_type`=1 AND `user_employee`=?',id,  function(err, results) {
          conn.query('SELECT `employee_name` FROM  `employee` WHERE `idemployee` = ? ',id,  function(err, resultz) {
            conn.query('UPDATE `phone` SET `status` = 0 ,`modify_date` = ? WHERE `user_type`= 1 AND`user_employee` = ?',[date,id]);
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
  /* get employee  */
  getemployee : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `employee` WHERE `status`= 1 AND`idemployee` = ?;SELECT `idphone`,`phone_number`,`type`,`p_type` FROM `phone` WHERE `status`= 1 AND `user_type`=1 AND `user_employee` = ?',[id,id],  function(err, result) {
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
      var date = new Date();
      console.log(body);
      conn.query('UPDATE `employee` SET '+body.name+' = ?,`modify_date` = ? WHERE `idemployee` = ?',  [body.value,date,body.pk],  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(null,rec);
        }
      });
    });
  },
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
  /* get employee by center id */
  getEmployeeCenter : function(limit,id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `idemployee`,`employee_name`,`e`.`email`,`e`.`type`,`c`.`name`,`phone_number` FROM `centers` c,`employee` e LEFT JOIN`phone` p ON (`p`.`user_employee` = `e`.`idemployee` AND `p`.`user_type` = 1 AND `p`.status = 1) WHERE `c`.`center_id` = `e`.`center_idcenter` AND `e`.`center_idcenter`=? AND `e`.`status`= 1 GROUP BY `idemployee` limit ?,10; SELECT COUNT(*) as cnt FROM `employee` e  WHERE `e`.`center_idcenter`=? AND `e`.`status`= 1 ',[id,limit,id], function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          console.log(result);
          cb(result);
        }
      });
    });
  },
  /* get employee by office id */
  getEmployeeOffice : function(limit,id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `idemployee`,`employee_name`,`office_name`,`phone_number`,`idphone`,`type` FROM `employee`,`office`,`phone` WHERE `office`.`idoffice` = `user`.`office_idoffice` AND `phone`.`user_employee` = `user`.`iduser` AND `user`.`status` = 1 AND `user`.`level` = 2 group by `iduser`limit ?,10; SELECT COUNT(*) as cnt FROM `user`  WHERE `status` = 1 AND `level` = 2;', limit,function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /* get All employee . */
  getAllEmployee : function(limit,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `e`.`idemployee`,`e`.`employee_name`,`p`.`phone_number`,`p`.`idphone`,`p`.`type` FROM `employee` e,`phone` p WHERE `p`.`user_employee` = `e`.`idemployee` AND `e`.`status` = 1 AND `p`.`status` = 1 AND `p`.`user_type` = 1 group by `idemployee` limit ?,10; SELECT COUNT(*) as cnt FROM  `employee`,`phone` WHERE `phone`.`user_employee` = `employee`.`idemployee` AND `employee`.`status` = 1 AND `phone`.`status` = 1 AND `user_type` = 1 group by `idemployee` ;', limit,function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /*Search employee by name*/
  searchEmployee : function(name,level,ido,cb){
    name = name+"%";
    mysqlMgr.connect(function (conn) {
      if(level == 2 ){
        conn.query('SELECT  `idemployee`,`employee_name`,`e`.`email`,`e`.`type`,`c`.`name`,`phone_number` FROM `centers` c,`employee` e LEFT JOIN`phone` p  ON (`p`.`user_employee` = `e`.`idemployee` AND `p`.`user_type` = 1 AND `p`.`status`=1) WHERE  `c`.`center_id` = `e`.`center_idcenter` AND `e`.`status`= 1 AND `e`.`employee_name` LIKE ? AND`c`.`office_idoffice` =? AND `c`.`status`=1 GROUP BY `idemployee`',[name,ido],  function(err, result) {
            conn.release();
            if(err) {
              util.log(err);
            } else {
              cb(result);
            }
        });
      }else{
        conn.query('SELECT `idemployee`,`employee_name`,`e`.`email`,`e`.`type`,`c`.`name`,`phone_number` FROM `centers` c,`employee` e LEFT JOIN`phone` p  ON (`p`.`user_employee` = `e`.`idemployee` AND `p`.`user_type` = 1 AND `p`.`status`=1) WHERE  `c`.`center_id` = `e`.`center_idcenter` AND `e`.`employee_name` LIKE ? AND `e`.`status`= 1 AND `c`.`status`=1 GROUP BY `idemployee`',name, function(err, result) {
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
  /*Search employee in center*/
  searchEmpInCenter : function(name,idc,cb){
    name = name+"%";
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT  `idemployee`,`employee_name`,`e`.`email`,`e`.`type`,`c`.`name`,`phone_number` FROM `employee` e,`centers` c,`phone` p WHERE `e`.`employee_name` LIKE ? AND`p`.`user_employee` = `e`.`idemployee` AND `p`.`user_type` = 1 AND `c`.`center_id` = `e`.`center_idcenter` AND `c`.`center_id` =? AND `e`.`status`= 1 AND `c`.`status`=1 AND `p`.`status`=1  GROUP BY `idemployee',[name,idc],  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /* check if email exists */
  checkEmail : function(email,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `status` FROM `employee` WHERE `status` = 1 AND`email` = ? ',  email,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /* Add employee */
  addemployee : function(body,cb){
    mysqlMgr.connect(function (conn) {
      var phone = body.phone;
      var type = body.phone_type;
      var p_type = body.p_type;
      delete body["p_type"];
      delete body["phone"];
      delete body["phone_type"];
      delete body["office_idoffice"];
      delete body["subconstituency_idsubconstituency"];
      conn.query('INSERT INTO `employee` SET ?',  body,  function(err, result) {
        if(err) {
          util.log(err);
        } else {
          var results={
            id:result.insertId,
            name :body.employee_name
          }
          for (var i=0;i<phone.length;i++) {
              conn.query('INSERT INTO `phone` SET `user_type` = 1, `phone_number` = ?,type=?,`user_employee` =? ,`p_type` =?',[phone[i],type[i],results.id,p_type[i]]);
              }
        conn.release();
          cb(results);
        }
      });
    });
  },
};
