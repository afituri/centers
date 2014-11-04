var express = require('express');
var router = express.Router();

/* GET home offices  page. */
router.get('/', function(req, res) {
  userMgr.getOffice(function(result){
    res.render('office', { title: "اللجان  الأنتخابية" , offices : result});
  })
});

/* GET office add  page. */
router.get('/addoffice', function(req, res) {
  res.render('addoffice', { title: "اللجان  الأنتخابية" });
});


/* GET centerS id  page. */
router.get('/:id', function(req, res) {
  res.render('centers', { title: 'Express' });
});


/* GET center page  page. */
router.get('/:id/:cid', function(req, res) {
  res.render('center', { title: 'Express' });
});
/* delete office  */
router.get('/deleteoffice/:id', function(req, res) {
  console.log("you are in officee.root")
  userMgr.deloff(req.params.id,function(result){
    res.send(result);
  })
});

module.exports = router;