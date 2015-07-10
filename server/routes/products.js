var express = require('express');
var router = express.Router();
var ProductDB = require('../models/product');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/addOneTest',function(req,res){



});

module.exports = router;
