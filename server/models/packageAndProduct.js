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

packageAndProductSchema.set('toObject', { virtuals: true })

var packageAndProductModel = mongoose.model('packageAndProduct', packageAndProductSchema);

module.exports = packageAndProductModel;