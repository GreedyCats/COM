var express = require('express');
var router = express.Router();
var address = require('../controllers/address');
var Response = require('../controllers/response');

router.get('/', function(req, res) {
    res.send('respond with a resource');
});