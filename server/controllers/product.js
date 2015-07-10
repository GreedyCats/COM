var Product = require('../models/product');

module.exports = {
	model:Product,
	addOne:function(data,next){
		var newProduct = new Product(data);
		newProduct.save(function(err,data){
			next(err,data);
		});
	}
};