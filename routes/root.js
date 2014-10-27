var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var userMgr = require('../app/user').userMgr;


/* GET home page. */
router.get('/', function(req, res) {
  userMgr.getUsers(function(results){
    res.render('root',{title: 'المستخدمين', users : results});
  })
});

router.get('/adduser', function(req, res) {
  res.render('adduser', { title: 'إضافة مستخدم' });
});

/* POST adduser form for root */
router.post('/adduser', function(req, res) {
  userHelpers.addUser(req, function (results){
    userMgr.getUsers(function(results){
      res.render('root',{title: 'root', users : results});
    });
  });
});
/* get userby id form for root */
router.get('/getUser/:id', function(req, res) {
  console.log("got here");
  userMgr.getUser(req.params.id,function(result){
    res.send(result);
  })
});
module.exports = router;