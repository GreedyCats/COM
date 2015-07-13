var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var country = require('./country');

var productSchema = new Schema({
	title: {type: String, default: ""},
	weight: {type: String, default: ""},
	imageList: [{type: String, default: ""}],
	thumbnail: {type: String, default: ""},
	country: {
		type: Schema.Types.ObjectId,
		ref: 'Country'
	}
});

var ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;