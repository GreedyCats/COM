var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var packageSchema = new Schema({
	title: {type: String, default: ""},
	subTitle: {type: String, default: ""},
	price: {type: Number, default: 0},
	originalPrice: {type: Number, default: 0},
	type: {type: Number, default: 0},
	typeName: {type: String, default: "2-4"},
	activityType: {type: Number, default: 0},
	activityTypeName: {type: String, default: "normal"},
	packageImage: {type: String, default: ""},
	thumbnail: {type: String, default: ""},
	desc: {type: String, default: ""}
});

var packageModel = mongoose.model('Package', packageSchema);

module.exports = packageModel;