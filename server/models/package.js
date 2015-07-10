var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var packageSchema = new Schema({
	title: {type: String, default: ""},
	subTitle: {type: String, default: ""},
	price: {type: Number, default: 0},
	originalPrice: {type: Number, default: 0},
	type: {type: Number, default: 0},
	typeName: {type: String, default: ""},
	activityType: {type: Number, default: 0},
	activityTypeName: {type: String, default: ""},
	packageImage: {type: String, default: ""},
	desc: {type: String, default: ""}
});

var packageModel = mongoose.model('Package', goodSchema);

module.exports = packageModel;