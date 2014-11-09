var mysqlMgr = require('./mysql').mysqlMgr,
  util=require('util');
exports.employeeMgr = {
  /* get employee fro manager or root or admin */
  getemployee : function(id,level,cb){
    mysqlMgr.connect(function (conn) {
      var sql='SELECT  `idemployee`,`employee_name`,`e`.`email`,`e`.`type`,`c`.`name`,`phone_number` FROM `employee` e,`centers` c,`phone` p WHERE `p`.`user_employee` = `e`.`idemployee` AND `p`.`user_type` = 1 AND `c`.`idcenter` = `e`.`center_idcenter` AND `e`.`status`= 1';
      if(level == 0 ){
        conn.query('SELECT `office_idoffice` FROM `user` WHERE `iduser` = ?',id,  function(err, result) {
          sql+=" AND `c`.`office_idoffice` = "+result[0].office_idoffice;
          console.log(sql);  
        });
      } 
      conn.query(sql,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
   /* get employee by id */
  getemployee : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `employee` WHERE status = 1 AND idemployee = ? ', id ,  function(err, result) {
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