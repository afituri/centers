var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var userMgr = require('../app/user').userMgr;
var log = require('../app/log').repo;

/* GET home page. */
router.get('/', function(req, res) {
    res.render('employee',{title: 'الموظفين'});
});

/* GET editemployee page. */
router.get('/editemployee', function(req, res) {
  res.render('editemployee', { title: "تعديل الموظفين" });
});

/* GET centers. 
router.get('/getCenters', function(req, res) {
    userMgr.getCenters(function(result){
    res.send(result);
  })
});
*/

/* GET addemployee page. */
router.get('/addemployee', function(req, res) {
  res.render('addemployee', { title: "اضافه موظفين" });
});


module.exports = router;