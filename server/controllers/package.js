var Package = require('../models/product');

module.exports = {
	model:Package,
	addOne:function(data,next){
		var newPackage = new Package(data);
		newPackage.save(function(err,data){
			next(err,data);
		});
		return newProduct;
	},
	getTodayPackages:function(next){
		Package.find().select('_id title weight country').populate({path:'country',select:'name flagUrl'}).exec(next);
	}
};