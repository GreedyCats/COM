var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
	title: String,
	weight: String,
	country: {
		type: Schema.Types.ObjectId,
		ref: 'Country'
	}
});

productSchema.methods.addOne = function(data,next){
	
}

var productModel = mongoose.model('Product', productSchema);

module.exports = productModel;