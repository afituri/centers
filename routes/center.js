var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var centerMgr = require('../app/center').centerMgr;

router.get('/:cid', function(req, res) {
  centerMgr.getCenter(req.params.cid,function(results){
    res.render('center', { title: 'مركز البينات ' , cent : results });
  })
});
module.exports = router;
