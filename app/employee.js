var mysqlMgr = require('./mysql').mysqlMgr,
  util=require('util');
exports.employeeMgr = {
  /* get employee fro manager or root or admin */
  getemployee : function(id,level,id_of,cb){
    mysqlMgr.connect(function (conn) {
      if(level == 0 ){
        conn.query('SELECT  `idemployee`,`employee_name`,`e`.`email`,`e`.`type`,`c`.`name`,`phone_number` FROM `employee` e,`centers` c,`phone` p WHERE `p`.`user_employee` = `e`.`idemployee` AND `p`.`user_type` = 1 AND `c`.`idcenter` = `e`.`center_idcenter` AND `e`.`status`= 1 AND `c`.`office_idoffice` =? GROUP BY `idemployee`',id_of,  function(err, result) {
            conn.release();
            if(err) {
              util.log(err);
            } else {
              cb(result);
            } 
                  
        });
      }else{
        conn.query('SELECT  `idemployee`,`employee_name`,`e`.`email`,`e`.`type`,`c`.`name`,`phone_number` FROM `employee` e,`centers` c,`phone` p WHERE `p`.`user_employee` = `e`.`idemployee` AND `p`.`user_type` = 1 AND `c`.`idcenter` = `e`.`center_idcenter` AND `e`.`status`= 1 ',  function(err, result) {
          conn.release();
          console.log(result); 
          if(err) {
            util.log(err);
          } else {
            cb(result);
          }
        });
      }     
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
  }
};