var express = require('express');
var router = express.Router();
var product = require('../controllers/product');

/* GET users listing. */
router.get('/', function(req, res) {
    res.send('respond with a resource');
});

router.get('/addOneTest', function(req, res) {

	product.addOne({
        'title': '夏日么么茶',
        'weight':'28',
        'country': '559f743d78dd37b21b9d4b5b',
        'thumbnail': 'http://d6.yihaodianimg.com/N01/M09/04/AC/CgQIzVPh1D2AR3OuAAPb2K-HitM17701_50x50.jpg'
    },function(err,data){
    	if (err) {
    		res.send(500);
    	}else{
    		res.send(data+'');
    	}
    })

});

router.get('/getAll', function(req, res) {
	product.getAll(function(err,data){
    	if (err) {
    		res.send(500);
    	}else{
    		var data = JSON.stringify(data);
    		res.send(data);
    	}
    })
});

module.exports = router;
