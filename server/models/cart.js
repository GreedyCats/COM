var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = new Schema({
	userID: {
		type: Schema.Types.ObjectId, ref: 'User'
	},
	packageList: [{
		type: Schema.Types.ObjectId,
		ref: 'Package'
	}]
});

var cartModel = mongoose.model('Cart', cartSchema);

module.exports = cartModel;