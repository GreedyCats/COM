var Address = require('../models/address');

module.exports = {
	module: Address,
	addOne: function(data, next){
		var newAddress = new Address(data);
		newAddress.save(function(err, data){
			next(err, data);
		});
	},
	updateByID: function(data, next){
		Address.update({'_id': data._id}, data, {}, function(err){
			next(err);
		});
	},
	getOneByID: function(addressID, next){
		Address.findById(addressID, function(err, data){
			next(err, data);
		});
	},
	deleteByID: function(addressID, next){
		Address.findOneAndRemove({'_id': addressID}, function(err, data){
			next(err, data);
		});
	}
}