var Package = require('../models/package');
var PackageAndProduct = require('../models/packageAndProduct');
var Country = require('../models/country');

var countries = {};

Country.find().exec(function(err, data) {
    data.forEach(function(country, index) {
        countries[country._id] = country;
    })
})


module.exports = {
    model: Package,
    addOne: function(data, next) {
        var newPackage = new Package(data);
        newPackage.save(function(err, data) {
            next(err, data);
        });
    },
    addOneRelationshipOfPackageAndProduct: function(data, next) {
        var newRelation = new PackageAndProduct(data);
        newRelation.save(function(err, data) {
            next(err, data);
        });
    },
    getTodayPackages: function(next) {

        var packageID_1 = '55a720d24cc9eaeb14cc4ce2'; //一个默认测试PackageID
        var packageID_2 = '55a720e14cc9eaeb14cc4ce4';
        var packageID_3 = '55a720f94cc9eaeb14cc4ce5';

        PackageAndProduct.find().where('package').in([packageID_1, packageID_2, packageID_3]).select('_id package product count').populate({
            path: 'package'
        }).populate({
            path: 'product',
            select: 'title weight country thumbnail'
        }).lean().exec(function(err, data) {
            var resData = {};
            var resArr = [];
            data.forEach(function(p, index) {
                // console.log(p.product.country);
            	p.product.country = countries[p.product.country];
                console.log(p.product.country);
                var product = createObject(p.product);

                product.count = p.count;
                if (!resData.hasOwnProperty(p.package._id)) {
                    resData[p.package._id] = {
                        title: p.package.title,
                        subTitle: p.package.subTitle,
                        price: p.package.price,
                        originalPrice: p.package.originalPrice,
                        type: p.package.type,
                        typeName: p.package.typeName,
                        activityType: p.package.activityType,
                        activityTypeName: p.package.activityTypeName,
                        packageImage: p.package.packageImage,
                        desc: p.package.desc,
                        products: [product]
                    }
                } else {
                    resData[p.package._id].products.push(product);
                }
            })
            for (p in resData) {
                var pObject = {};
                pObject = resData[p];
                pObject._id = p;
                resArr.push(pObject);
            }
            next(err, resArr);
        });
    }
};

function createObject(obj) {
    var newObj = {};
    for (key in obj) {
        newObj[key] = obj[key];
    }
    return newObj;
}
