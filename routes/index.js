var express = require('express');
var router = express.Router();
var userHelpers = require('../app/userHelpers');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('/users/login', { title: 'Express' });
});

module.exports = router;
