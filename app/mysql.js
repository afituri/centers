
/************************************************************************/
var mysql      = require('mysql');
var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'dunstuff',
  database : 'centers',
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