var Product = require('../models/product');

module.exports = {
	model:Product,
	addOne:function(data,next){
		var newProduct = new Product(data);
		newProduct.save(function(err,data){
			next(err,data);
		});
	},
	getAll:function(next){
		Product.find().select('_id title weight country').populate({path:'country',select:'name flagUrl'}).exec(next);
	},
	getOneById:function(productID,next){
		Product.findById(productID,function(err,data){
			next(err,data);
		})
	}
};