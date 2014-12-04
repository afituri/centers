var express = require('express');
var router = express.Router();
var userHelpers = require('../app/userHelpers');

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/users/login');
});

module.exports = router;
