var express = require('express');
var router = express.Router();
var userMgr = require('../app/user').userMgr;


/* GET home page. */
router.get('/', function(req, res) {
  userMgr.getManager(function(results){
    res.render('admin',{title: 'المدراء', users : results});
  })
});



router.get('/addmanager', function(req, res) {
  res.render('addmanager', { title: 'اضافة مدير' });
});


/* get userby level form for admin */
router.get('/getManager/:level', function(req, res) {
  console.log("got here level");
  userMgr.getManager(function(result){
    res.send(result);
  })
});

module.exports = router;