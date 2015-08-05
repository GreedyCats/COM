var express = require('express');
var router = express.Router();
var product = require('../controllers/user');


router.get('/addOneTest', function(req, res) {

    product.addOne({
        'username': '芝麻呱呱呱',
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


module.exports = router;
