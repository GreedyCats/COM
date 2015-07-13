var Package = require('../models/package');

module.exports = {
	model:Package,
	addOne:function(data,next){
		var newPackage = new Package(data);
		newPackage.save(function(err,data){
			next(err,data);
		});
	},
	getTodayPackages:function(next){
		Package.find().select('_id title weight country').populate({path:'country',select:'name flagUrl'}).exec(next);
	}
};