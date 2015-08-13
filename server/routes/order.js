var express = require('express');
var router = express.Router();
var order = require('../controllers/order');
var Response = require('../controllers/response');
var user = require('../controllers/user');

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
    }, function(err, data) {
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
router.post('/getOrderList', function(req, res) {
    var response = new Response();
    var ut = req.cookies.ut;
    var orderStatus = req.body.orderStatus || 0;
    user.checkLogin(ut, function(result) {
        if (result.status) {
            var userID = result.userID;
            order.getOrderByUserID({
                userID: userID,
                orderStatus: orderStatus
            }, function(err, data) {
                if (err) {
                    response.data = {};
                    response.message = '服务器错误';
                    response.code = -2;
                } else {
                    response.data = data;
                    response.code = 1;
                }
                res.send(response);
            });
        } else {
            response.data = {};
            response.message = '未登录,请先登录';
            response.code = -1;
            res.send(response);
        }
    })
});
router.get('/getOneByID', function(req, res) {
    var response = new Response();
    order.getOneByID('14391955412237692', function(err, data) {
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
router.post('/modifyStatus', function(req, res) {
    var response = new Response();
    var ut = req.cookies.ut;
    var orderID = req.body.orderID;
    var orderStatus = req.body.orderStatus;
    if (!orderID) {
        response.code = -2;
        response.message = 'orderID为空';
        res.send(response);
        return;
    };
    if (!orderStatus) {
        response.code = -2;
        response.message = 'order状态为空';
        res.send(response);
        return;
    };
    user.checkLogin(ut, function(result) {
        if (result.status) {
            var userID = result.userID;
            order.modifyStatus({
                userID: userID,
                orderID: orderID,
                status: orderStatus
            }, function(err, data) {
                if (err) {
                    response.code = -2;
                    response.message = err;
                } else {
                    response.code = 1;
                    response.data = data;
                    response.message = '状态更改成功';
                }
                res.send(response);
            });
        } else {
            response.data = {};
            response.message = '未登录,请先登录';
            response.code = -1;
            res.send(response);
        }
    })
});

//删除订单或者更改订单状态的接口，需要先判断是否已经登陆，获取用户ID之后再去判断这个订单是否属于当前用户，如果不属于的话是不能随便删除或者更改订单状态的
router.post('/deleteByOrderID', function(req, res) {
    var response = new Response();
    var orderID = req.body.orderID;
    var ut = req.cookies.ut;
    console.log(orderID)
    if (!orderID) {
        response.code = -2;
        response.message = 'orderID为空';
        res.send(response);
        return;
    };
    user.checkLogin(ut, function(result) {
        if (result.status) {
            var userID = result.userID;
            order.modifyStatus({
                userID: userID,
                orderID: orderID,
                status: '-1'
            }, function(err, data) {
                if (err) {
                    response.code = -9;
                    response.message = err;
                } else {
                    response.code = 1;
                    response.message = '删除成功';
                    response.data = data;
                }
                res.send(response);
            });
        } else {
            response.data = {};
            response.message = '未登录,请先登录';
            response.code = -1;
            res.send(response);
        }
    })
});
module.exports = router;
