var express = require('express');
var router = express.Router();
var userHelpers = require('../app/userHelpers');

/* GET home page. */
router.get('/', userHelpers.isAdmin, function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
