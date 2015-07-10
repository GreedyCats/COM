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
        'weight':'28'
    },function(err,data){
    	res.send(err,data);
    })

});

module.exports = router;
