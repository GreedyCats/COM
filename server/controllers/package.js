var Package = require('../models/package');
var PackageAndProduct = require('../models/packageAndProduct');

module.exports = {
	model:Package,
	addOne:function(data,next){
		var newPackage = new Package(data);
		newPackage.save(function(err,data){
			next(err,data);
		});
	},
	addOneRelationshipOfPackageAndProduct:function(){
		var packageID_1 = '55a3336db1146c4873b45b6a'; //一个默认测试PackageID
		var packageID_2 = '55a349c186a985f37487fc0d'; //一个默认测试PackageID
		var packageID_3 = '55a349e54c9f663b75868027'; //一个默认测试PackageID

		

	},
	getTodayPackages:function(next){
		Package.find().select('_id title weight country').populate({path:'country',select:'name flagUrl'}).exec(next);
	}
};