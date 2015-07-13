var express = require('express');
var router = express.Router();
var package = require('../controllers/package');

/* GET users listing. */
router.get('/', function(req, res) {
    res.send('respond with a resource');
});

router.get('/addOneTest', function(req, res) {

	package.addOne({
        'title': 'Summer Tea 夏日么么茶',
        'subTitle':'28',
        'price':68,
        'originalPrice':86,
        'type':'',
        'typeName':'',
        'activityType':'',
        'activityTypeName':'',
        'packageImage':'',
        'desc':''
    },function(err,data){
    	if (err) {
    		res.send(500);
    	}else{
    		res.send(data+'');
    	}
    })
});

router.get('/getAll', function(req, res) {
	package.getAll(function(err,data){
    	if (err) {
    		res.send(500);
    	}else{
    		var data = JSON.stringify(data);
    		res.send(data);
    	}
    })
});

module.exports = router;

