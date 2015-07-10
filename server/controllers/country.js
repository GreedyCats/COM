var Country = require('../models/country');

module.exports = {
	model:Country,
	addOne:function(data,next){
		var newCountry = new Country(data);
		newCountry.save(function(err,data){
			next(err,data);
		});
	}
};