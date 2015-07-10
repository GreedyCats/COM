var express = require('express');
var router = express.Router();
var country = require('../controllers/country');

/* GET users listing. */
router.get('/', function(req, res) {
    res.send('respond with a resource');
});

router.get('/addOneTest', function(req, res) {

	country.addOne({
        'name': '美国',
        'flagUrl':'http://img.sj33.cn/uploads/allimg/201401/7-14012P15942U3.jpg'
    },function(err,data){
    	if (err) {
    		res.send(500);
    	}else{
    		res.send(data+'');
    	}
    })

});

module.exports = router;
