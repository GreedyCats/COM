var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var packageAndProductSchema = new Schema({
	package: {
		type: Schema.Types.ObjectId,
		ref: 'Package'
	},
	product: {
		type: Schema.Types.ObjectId,
		ref: 'Product'
	},
	count: {type: Number, default: 1}
});

var packageAndProductModel = mongoose.model('packageAndProduct', packageAndProductSchema);

module.exports = packageAndProductModel;