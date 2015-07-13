var Package = require('../models/package');
var PackageAndProduct = require('../models/packageAndProduct');

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

        var packageID_1 = '55a3336db1146c4873b45b6a'; //一个默认测试PackageID
        var packageID_2 = '55a349c186a985f37487fc0d';
        var packageID_3 = '55a349e54c9f663b75868027';

        PackageAndProduct.find().where('package').in([packageID_1, packageID_2, packageID_3]).select('_id package product count').populate({
            path: 'package'
        }).populate({
            path: 'product'
        }).exec(function(err, data) {
            var resData = {};
            var resArr = [];
            data.forEach(function(p, index) {
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
                        products: [p.product]
                    }
                } else {
                    resData[p.package._id].products.push(p.product);
                }
            })
            for(p in resData){
            	var pObject = {};
            	pObject = resData[p];
            	pObject._id = p;
            	resArr.push(pObject);
            }
            next(err, resArr);
        });
    }
};
