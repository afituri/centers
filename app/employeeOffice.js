var mysqlMgr = require('./mysql').mysqlMgr,
  util=require('util');
exports.employeeOfficeMgr = {
  /* get employee  */
  getEmployeeOffice : function(limt,oid,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `e`.`id_emp_office`, `e`.`emp_office_name`, `e`.`email`, `e`.`type`, `e`.`nid`, `p`.`phone_number`,`e`.`office_id`, `o`.`office_name_ar`, `e`.`acount_number`, `e`.`bank_name` FROM  `office` o,`employeeOffice` e LEFT JOIN `phone` p ON (`p`.`user_employee`=`e`.`id_emp_office` AND `p`.`user_type`=2 AND `p`.`status`=1)  WHERE `o`.`idoffice`=`e`.`office_id` AND `e`.`office_id`=? AND `e`.`status`=1 AND `o`.`status`=1  group by `e`.`id_emp_office`, `e`.`emp_office_name`, `e`.`email`, `e`.`type`, `e`.`nid`, `p`.`phone_number`,`e`.`office_id`, `o`.`office_name_ar`, `e`.`acount_number`, `e`.`bank_name` limit ?,10; SELECT COUNT(*) as cnt FROM `employeeOffice`  WHERE `status` = 1 AND `office_id`=?;' ,[oid,limt,oid],function(err, result) {
      //conn.query('SELECT `e`.`id_emp_office`, `e`.`emp_office_name`, `e`.`email`, `e`.`type`, `e`.`nid`, `p`.`phone_number`,`e`.`office_id`, `o`.`office_name_ar`, `e`.`acount_number`, `e`.`bank_name` FROM  `office` o,`employeeOffice` e LEFT JOIN `phone` p ON (`p`.`user_employee`=`e`.`id_emp_office` AND `p`.`user_type`=2 AND `p`.`status`=1)  WHERE `o`.`idoffice`=`e`.`office_id` AND `e`.`office_id`=? AND `e`.`status`=1 AND `o`.`status`=1  group by `e`.`id_emp_office` ' ,[oid],function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      }); 
    });
  },
  //get employee eidt
    getEmployeeedit : function(limt,oid,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `e`.`id_emp_office`, `e`.`emp_office_name`, `e`.`email`, `e`.`type`, `e`.`nid`, `p`.`phone_number`,`e`.`office_id`, `o`.`office_name_ar`, `e`.`acount_number`, `e`.`bank_name` FROM  `office` o,`employeeOffice` e LEFT JOIN `phone` p ON (`p`.`user_employee`=`e`.`id_emp_office` AND `p`.`user_type`=2 AND `p`.`status`=1)  WHERE `o`.`idoffice`=`e`.`office_id` AND `e`.`office_id`=? AND `e`.`status`=1 AND `o`.`status`=1  group by `e`.`id_emp_office`, `e`.`emp_office_name`, `e`.`email`, `e`.`type`, `e`.`nid`, `p`.`phone_number`,`e`.`office_id`, `o`.`office_name_ar`, `e`.`acount_number`, `e`.`bank_name` limit ?,10; SELECT COUNT(*) as cnt FROM `employeeOffice`  WHERE `status` = 1 AND `office_id`=?;' ,[oid,limt,oid],function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
   //get employesuboffice eidt
    getSubOffice : function(oid,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM  `subconstituency` WHERE  `office_idoffice` = ? ' ,oid,function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },

  /* Add employee office  */
  addemployeeoffice : function(body,cb){
    mysqlMgr.connect(function (conn) {
      var phone = body.phone;
      var type = body.phone_type;
      var p_type = body.p_type;
      delete body["p_type"];
      delete body["idoffice"];
      delete body["phone"];
      delete body["phone_type"];
      conn.query('INSERT INTO `employeeOffice` SET ?',  body,  function(err, result) {
        if(err) {
          util.log(err);
        } else {
          var results={
            id:result.insertId,
            name :body.employee_name
          }
          console.log(results);
          for (var i=0;i<phone.length;i++) {
              conn.query('INSERT INTO `phone` SET `user_type` = 2, `phone_number` = ?,type=?,`user_employee` =? ,`p_type` =?',[phone[i],type[i],results.id,p_type[i]]);
            }
              conn.release();
              cb(body.office_id);
        }
      });
    });
  },
  /*delete employee */
  deleteemployeeoffice : function(id,cb){
    mysqlMgr.connect(function (conn) {
      var date = new Date();
      conn.query('UPDATE `employeeOffice` SET `status` = 0 ,`modify_date`= ? WHERE `id_emp_office` = ?',[date,id],  function(err, result) {
        conn.query('SELECT `idphone`,`phone_number` FROM  `phone` WHERE `status` = 1  AND `user_type`=2 AND `user_employee`=?',id,  function(err, results) {
          conn.query('SELECT `emp_office_name` FROM  `employeeOffice` WHERE `id_emp_office` = ? ',id,  function(err, resultz) {
            conn.query('UPDATE `phone` SET `status` = 0 ,`modify_date` = ? WHERE `user_type`= 2 AND`user_employee` = ?',[date,id]);
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
  /* Get employee */
  getEmployeeOfficeById : function(ide,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `employeeOffice` WHERE `status` = 1  AND `id_emp_office`=? ; SELECT `idphone`,`phone_number`,`type`,`p_type` FROM `phone` WHERE `status`= 1 AND `user_type`=2 AND `user_employee` = ?',[ide,ide],function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /* Edit employee */
  editEmployeeOfficeEditable : function(body,cb){
    mysqlMgr.connect(function (conn) {
      var date = new Date();
      console.log(body);
      console.log('UPDATE `employeeOffice` SET '+body.name+' = '+body.value+',`modify_date`='+date+' WHERE `id_emp_office` = '+body.pk);
      conn.query('UPDATE `employeeOffice` SET '+body.name+' = ?,`modify_date`=? WHERE `id_emp_office` = ?',  [body.value,date,body.pk],  function(err, result) {
      console.log(result);
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  checkEmail : function(email,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `status` FROM `employeeOffice` WHERE `status` = 1 AND`email` = ? ',  email,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
};
