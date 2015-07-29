var express = require('express');
var router = express.Router();
var packages = require('../controllers/package');
var Response = require('../controllers/response');

/* GET users listing. */
router.get('/', function(req, res) {
    res.send('respond with a resource');
});

router.get('/addOneTest', function(req, res) {
    packages.addOne({
        'title': 'Summer Tea 夏日么么茶',
        'subTitle': '夏日么么茶下午茶系列',
        'price': 68,
        'originalPrice': 86,
        'packageImage': '/uploads/1.jpeg'
    }, function(err, data) {
        if (err) {
            res.send(500);
        } else {
            var data = JSON.stringify(data);
            res.send(data);
        }
    })
});

router.post('/getTodayPackage', function(req, res) {
    var response = new Response();
    packages.getTodayPackages(function(err, data) {
        if (err) {
            response.status = 'error';
            response.message = err;
        } else {
            response.status = 'success';
            response.data.list = data;
        }
        res.send(response);
    })
});

router.get('/addOneRelation', function(req, res) {

    var data = [];

    var packageID_1 = '55a720d24cc9eaeb14cc4ce2'; //一个默认测试PackageID
    var packageID_2 = '55a720e14cc9eaeb14cc4ce4';

    var productID_1 = '55a766e05eb73e2c1c8ca291';
    var productID_2 = '55a720294cc9eaeb14cc4ce0';
    var productID_3 = '55a766db5eb73e2c1c8ca28f';
    var productID_4 = '55a720274cc9eaeb14cc4cde';

    var r1 = {
        package: packageID_1,
        product: productID_1,
        count: 1
    }

    var r2 = {
        package: packageID_1,
        product: productID_2,
        count: 1
    }

    var r3 = {
        package: packageID_1,
        product: productID_3,
        count: 1
    }

    var r4 = {
        package: packageID_1,
        product: productID_4,
        count: 1
    }

    var r5 = {
        package: packageID_2,
        product: productID_1,
        count: 1
    }

    var r6 = {
        package: packageID_2,
        product: productID_2,
        count: 1
    }

    var r7 = {
        package: packageID_2,
        product: productID_3,
        count: 1
    }

    var r8 = {
        package: packageID_2,
        product: productID_4,
        count: 1
    }

    data = [r1, r2, r3, r4, r5, r6, r7, r8];

    data.forEach(function(r, i) {
        packages.addOneRelationshipOfPackageAndProduct(r, function(err, data) {
        	if (err) {
        		console.log(err);
        	};
        });
    });

    res.send('true');

});

module.exports = router;
