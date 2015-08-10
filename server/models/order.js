var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
	userID: {type: String, default: ''},
	orderID: {type: String, default: ''},
	yhd_orderID: {type: String, default: ''},
	packageList: [{
		type: Schema.Types.ObjectId,
		ref: 'Package'
	}],
	price: {type: Number, default: 0},
	address: {
		type: Schema.Types.ObjectId,
		ref: 'Address'
	},
	status: {type: Number, default: 0},
	statusDesc: {type: String, default: '未付款'},
	createTime: {type: Date, default: Date.now}
});

var orderModel = mongoose.model('Order', orderSchema);

module.exports = orderModel;