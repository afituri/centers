var mysqlMgr = require('./mysql').mysqlMgr,
  util=require('util');
exports.employeeMgr = {
  /* get employee fro manager or root or admin */
  getemployee : function(id,level,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `employee_name`,`email`,`e`.`type`,`name`,`phone_number` FROM `employee` e,`centers` c,`phone` p WHERE p.user_employee = e.idemployee AND p.user_type = 1 AND c.idcenter = e.center_idcenter AND e.status = 1',  function(err, result) {
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