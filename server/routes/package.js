var express = require('express');
var router = express.Router();
var packages = require('../controllers/package');

/* GET users listing. */
router.get('/', function(req, res) {
    res.send('respond with a resource');
});

router.get('/addOneTest', function(req, res) {
	packages.addOne({
        'title': 'Summer Tea 夏日么么茶',
        'subTitle':'夏日么么茶下午茶系列',
        'price':68,
        'originalPrice':86,
        'packageImage':'/uploads/1.jpeg'
    },function(err,data){
    	if (err) {
    		res.send(500);
    	}else{
    		var data = JSON.stringify(data);
    		res.send(data);
    	}
    })
});

router.get('/getAll', function(req, res) {
	packages.getAll(function(err,data){
    	if (err) {
    		res.send(500);
    	}else{
    		var data = JSON.stringify(data);
    		res.send(data);
    	}
    })
});

module.exports = router;

