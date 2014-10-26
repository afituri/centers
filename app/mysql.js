
/************************************************************************/
var mysql = require('mysql');
var config = require('../config.json');
var pool = mysql.createPool({
  host     : config.host,
  user     : config.user,
  password : config.password,
  database : config.database,
  multipleStatements: true
});

var util = require("util");
/************************************************************************/
exports.mysqlMgr = {
  connect : function (callback){
  	pool.getConnection(function(err, connection) {
  	  callback(connection);
  	});

  },
  
}