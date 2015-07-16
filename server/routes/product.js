var express = require('express');
var router = express.Router();
var product = require('../controllers/product');

/* GET users listing. */
router.get('/', function(req, res) {
    res.send('respond with a resource');
});

router.get('/addOneTest', function(req, res) {

	product.addOne({
        'title': 'Kjeldsens丹麦蓝罐 曲奇 125g 丹麦进口',
        'weight':'28',
        'country': '55a766c600b6a3251cb149e1',
        'thumbnail': 'http://d7.yihaodianimg.com/N04/M05/32/15/CgQDr1MVOKaAcUwFAAMMdDR1CRY33401_360x360.jpg'
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
