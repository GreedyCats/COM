var express = require('express');
var router = express.Router();
var country = require('../controllers/country');

/* GET users listing. */
router.get('/', function(req, res) {
    res.send('respond with a resource');
});

router.get('/addOneTest', function(req, res) {

	country.addOne({
        'name': '韩国',
        'flagUrl':'http://yjfs.cname02.com/files/gls500257/500260.jpg'
    },function(err,data){
    	if (err) {
    		res.send(500);
    	}else{
    		res.send(data+'');
    	}
    });

});

module.exports = router;
