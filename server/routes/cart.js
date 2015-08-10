var express = require('express');
var router = express.Router();
var cart = require('../controllers/cart');
var Response = require('../controllers/response');
/* GET cart page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/getTotalPrice', function(req, res) {
    var cartList = req.body.cartList;
    var response = new Response();
    cart.getTotalPrice(cartList, function(err, data){
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

router.post('/getCartListInfo', function(req, res) {
    var cartList = req.body.cartList;
    var response = new Response();
    cart.getCartListInfo(cartList, function(err, data){
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

//修改购物车数量，依赖Cookie
router.post('/modifyCart',function(req,res){
    var token = req.cookie.ut;
    var modifyData = req.body.data;
    res.send({});
});

module.exports = router;