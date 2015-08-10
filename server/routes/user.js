var express = require('express');
var router = express.Router();
var user = require('../controllers/user');
var Response = require('../controllers/response');


router.get('/addOneTest', function(req, res) {

    user.addOne({
        'name': '芝麻呱呱呱',
        'phone': '13912345678',
        'password': '123456'
    }, function(err, data) {
        if (err) {
            res.send(500);
        } else {
            res.send(data + '');
        }
    })

});

router.get('/login', function(req, res) {

    var loginData = {
        'ut': req.cookies.ut,
        'phone': '13912345678',
        'password': '123456'
    }
    user.login(loginData,function(result){
        res.cookie('ut',result.ut,{maxAge:2592000000});
        res.send(result);
    })

});

router.get('/checkLogin', function(req, res) {
    var ut = req.cookies.ut;
    var response = new Response();
    user.checkLogin(ut, function(result) {
        response.status = result.status ? 'success' : 'error';
        response.data = result;
        res.send(response);
    })
})


module.exports = router;
