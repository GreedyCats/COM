var express = require('express');
var router = express.Router();
var cart = require('../controllers/cart');
var Response = require('../controllers/response');
var user = require('../controllers/user');

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
//data = { type : 操作类型[remove,modify,add] , packageID: packageID ,count:Int}
router.post('/modify',function(req,res){
    var ut = req.cookies.ut;
    var modifyData = req.body.data;
    var response = new Response();

    // modifyData = {
    //     type: 'modify',
    //     packageID:'55a720d24cc9eaeb14cc4ce2',
    //     count: 1
    // }

    user.checkLogin(ut,function(result){
        if (result.status) {
            //已登陆
            var userID = result.userID;
            cart.modifyCart(userID,modifyData,function(err,data){
                if (err) {
                    response.data = {};
                    response.message = '服务器错误';
                    response.code = -2;
                }else{
                    response.data = data;
                    response.code = 1;
                }
                res.send(response);
            })
        }else{
            response.data = {};
            response.message = '未登录,请先登录';
            response.code = -1;
            res.send(response);
        }
    })
});

module.exports = router;