var express = require('express');
var router = express.Router();
var order = require('../controllers/order');
var Response = require('../controllers/response');
/* GET users listing. */
router.get('/', function(req, res) {
    res.send('respond with a resource');
});

router.get('/addOneTest', function(req, res) {
    var response = new Response();
	order.addOne({
        'userID': '2',
        'packageList': [
            '55a720d24cc9eaeb14cc4ce2',
            '55a720e14cc9eaeb14cc4ce4'
        ],
        'price': 200.0
    },function(err,data){
    	if (err) {
            response.status = 'error';
            response.message = err;
        } else {
            response.status = 'success';
            response.data = data;
        }
        res.send(response);
    });

});
router.get('/getAllByUserID', function(req, res) {
    var response = new Response();
    order.getAllByUserID('2',function(err,data){
        if (err) {
            response.status = 'error';
            response.message = err;
        } else {
            response.status = 'success';
            response.data = data;
        }
        res.send(response);
    });

});
router.get('/getOneByID', function(req, res) {
    var response = new Response();
    order.getOneByID('14391955412237692',function(err,data){
        if (err) {
            response.status = 'error';
            response.message = err;
        } else {
            response.status = 'success';
            response.data = data;
        }
        res.send(response);
    });

});
router.get('/updateStatus', function(req, res) {
    var response = new Response();
    order.updateStatus({
        orderID: '14391955412237692',
        status: '1'
    },function(err,data){
        if (err) {
            response.status = 'error';
            response.message = err;
        } else {
            response.status = 'success';
            response.data = data;
        }
        res.send(response);
    });

});
router.get('/deleteByOrderID', function(req, res) {
    var response = new Response();
    order.updateStatus({
        orderID: '14391955412237692',
        status: '-1'
    },function(err,data){
        if (err) {
            response.status = 'error';
            response.message = err;
        } else {
            response.status = 'success';
            response.data = data;
        }
        res.send(response);
    });

});
module.exports = router;
