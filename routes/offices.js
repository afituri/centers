var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('offices', { title: "اللجان  الأنتخابية" });
});

/* GET constits page. */
router.get('/addoffice', function(req, res) {
  res.render('addoffice', { title: "اللجان  الأنتخابية" });
});

/* GET constits page. */
router.get('/addemployee', function(req, res) {
  res.render('addemployee', { title: "إضافة موظف" });
});

/* GET id  page. */
router.get('/:id', function(req, res) {
  res.render('centers', { title: 'Centers' });
});

/* GET id  page. */
router.get('/:id/:cid', function(req, res) {
  userMgr.getCenter(req.params.id,function(result){
    res.render('center', { title: 'بيانات المركز و الموظفين' , center : result });
  })
});

module.exports = router;
